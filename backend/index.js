import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './config/config.env' });

import express from "express";
import cors from "cors";
import {getPool} from './db.js';
import bcrypt from "bcrypt";
const pool = getPool();

import bodyParser from "body-parser";
import Razorpay from 'razorpay'

import payment from './routes/productRoutes.js'



const port = process.env.PORT || 4000
const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api/v1", payment) //middle wear for route


// //1: API to get all products
app.get("/api/cards", async (req, res)=>{
  try {
    const result = await pool.query(
      `SELECT 
      c.card_id, 
      c.title, 
      c.subtitle,
      json_agg(
      json_build_object( 
      'product_id', p.product_id,
      'name', p.name,
      'price', p.price,
      'description', p.description,
      'image_url', p.image_url
      )
      ) AS products
      FROM cards c
      JOIN products p ON c.card_id = p.card_id
      GROUP BY c.card_id
      `
    );
    //fetch in result var
    res.json(result.rows)//send result back to frontend as rows
    console.log("Data fetching:", result.rows)
  } catch (error) {
    console.error("Error sending products", error)
    res.status(500).json({error: "server error"})
  }
})





//2: API to get product details 
app.get("/api/products/:id", async (req, res)=>{
  const {id } = req.params
  try {
    // 🧩 Step 1: Get product details + join extra images
    const detail_data = `
      SELECT 
        p.product_id, 
        p.name, 
        p.price, 
        p.description, 
        p.category, 
        p.brand, 
        p.rating, 
        p.reviews, 
        p.stock, 
        p.image_url AS main_image,
        COALESCE(json_agg(pi.duplicate_image) FILTER (WHERE pi.duplicate_image IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN product_images pi
      ON p.product_id = pi.product_id
      WHERE p.product_id = $1
      GROUP BY p.product_id
    `;

    const result = await pool.query(detail_data, [id]); // ✅ bind $1 to id
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Database error", error.message)
    res.status(500).send("server error")
  }
})






//get data in cart below in row
app.get("/api/cart", async (req, res) => {

  try {
    const query = `
      SELECT 
        p.product_id,
        p.name,
        p.price,
        p.image_url AS main_image,
        p.rating,
        p.description
      FROM products p
      LIMIT 15
    `;
    
    const { rows } = await pool.query(query);
    res.json({ cart: rows });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Server error" });
  }
});














//3: accepting login req from frontend
app.post("/api/login", async (req, res)=>{
  const {email, password} = req.body

  try {
    //find user in db
  const user = await pool.query(
    'SELECT * FROM users WHERE email = $1 ',
    [email]
  )

  if(user.rows.length === 0){
    //not found user_email or password
    return res.status(401).json({message: "Invalid email or password"})
  }

  //comapre entered password with hashed password
  const storedHashedPassword = user.rows[0].password
  const passwordMatch = await bcrypt.compare(password, storedHashedPassword)

  //if dosent match
  if(!passwordMatch){
    return res.status(401).json({error: "Invalid email or password"})
  }

  //if match user email and password
  res.status(200).json({
    message: "Login successfully",
    user_id: user.rows[0].user_id,
    name: user.rows[0].name
  })
   //it is sending like {"userid": 1}
  } catch (error) {
    console.error("Login eror", error.message)
    res.status(500).json({message: "server error"})
  }
})
















// Add to cart req accept
app.post('/api/cart', async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  console.log("Data:", user_id, product_id, quantity)

  try {
    //check if product already exists
    const existingProduct = await pool.query(`
      SELECT * FROM cart WHERE user_id=$1 AND product_id = $2`, [user_id, product_id]
    );

    //if exist increasse quantity
    if(existingProduct.rows.length > 0){
      const newQuantity = existingProduct.rows[0].quantity + quantity

      const updated = await pool.query(`
        UPDATE cart SET quantity=$1 WHERE cart_id=$2 RETURNING*`,
      [newQuantity, existingProduct.rows[0].cart_id]
    )
    return res.json({message: "Quantity updated", cartItems: updated.rows[0]})
    } else {

      //if not insert new row
    const result = await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [user_id, product_id, quantity]
    );
    return res.json({message:"product added to cart", cartItems: result.rows[0]});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

















// //give a items of a specific user  in cart page
app.get("/api/cart/:userId", async (req, res)=>{
  const {userId} = req.params

  try {
    const cartQuery = `
    SELECT 
    c.cart_id,
    c.user_id, 
    c.product_id, 
    c.quantity, 
    p.name AS product_name,
    p.price AS product_price,
    p.image_url AS main_image,
    p.rating,
    p.description
    FROM cart c 
    JOIN products p ON c.product_id = p.product_id 
    WHERE c.user_id = $1`;

    const cartItems = await pool.query(cartQuery, [userId])
    console.log("Specific product:",cartItems.rows)
    //send rows to frontend
    res.json({cart: cartItems.rows})
  } catch (error) {
    console.error("Error fetching cart: ", error)
    res.status(500).json({error: "server error"})
  }
})





// increment quanity
app.put("/api/cart/increment/:proid", async (req, res)=>{
  const {proid} = req.params //cart item ID
  const {user_id} = req.body //user id

  try {
    const result = await pool.query(
      `UPDATE cart
      SET quantity = quantity + 1
      WHERE user_id = $1 AND product_id = $2 RETURNING *`,
      [user_id, proid]
    )
    res.json(result.rows[0])
  } catch (error) {
    console.error("Error increment:", error.message)
    res.status(500).json({message: "server error"})
  }
})




//decrease quantity
app.put("/api/cart/decrement/:proid", async (req, res)=>{
  const {proid} = req.params
  const {user_id}  = req.body
  try {
    const result = await pool.query(
      `UPDATE cart
      SET quantity = quantity - 1
      WHERE user_id = $1 AND product_id = $2 AND quantity > 0`,
      [user_id, proid]
    )

    // Optional: remove item if quantity reaches 0
    await pool.query(
      `DELETE FROM cart
      WHERE user_id = $1 AND product_id = $2 AND quantity = 0`,
      [user_id, proid]
    );

    res.json(result.rows[0])
  } catch (error) {
    console.error("Error decrement:", error.message)
    res.status(500).json({message: "Server error"})
  }
})




//receving registration api
app.post("/register/api", async (req, res)=>{
  try {
    const {name , email, password} = req.body
  console.log(name, email)

  //check if user already exists
  const existingUser = await pool.query(`
    SELECT * FROM users WHERE email = $1`, [email])
    if(existingUser.rows.length > 0){
      return res.status(400).json({
        error: "Email already registered"
      })
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //insert into database and return user Id
    const result = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id`, 
      [name, email, hashedPassword]
    );

    const user_id = result.rows[0].user_id


  res.status(200).json({message: "user registered successfully",user_id})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "server error"})
  }
})


//for creating a order
app.post("/api/orders/create", async (req, res) => {
  try {
    console.log("received data:", req.body)

    const {
      product_name, 
      product_price, 
      product_id,
      firstName,
    lastName,
  street,
city, 
country, 
zipcode, 
phone, 
email
} = req.body


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Order creation failed" });
  }
});




// razorpay instance
export const instance = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
})








//server express
app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})






// const { product_id, amount, address } = req.body;

    // const newOrder = new Order({
    //   product_id,
    //   amount,
    //   address,
    //   status: "pending",
    //   paymentStatus: "not_paid"
    // });

    // await newOrder.save();

    // res.json({
    //   orderId: newOrder._id, 
    //   amount: newOrder.amount
    // });