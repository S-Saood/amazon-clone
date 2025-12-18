import React, { useEffect, useState } from 'react';
import './Buynow.css';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function Buynow() {
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  count: "",
  zipCode: "",
  phone: ""
});

  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading product...</h2>;


  // const handleContinue = async () => {
  //   try {
  //     const orderData = {
  //       product_id: product.product_id,
  //       amount: product.price,
  //       address: formData
  //     };

  //   // Create order on backend
  //     const res = await axios.post("http://localhost:3000/api/orders/create", orderData)

  //         // Get orderId from backend
  //     const orderId = res.data.orderId

  //     navigate(`/payment?order`)
  //   } catch (error) {
  //     console.error("Errpr creating Order:", error)
  //   }
  // }

  // const handleContinue = async ()=>{
  //   try {
  //     const Orderdata = {
  //     //product info
  //   product_name: product.name, 
  //   product_price: product.price, 
  //   product_id: product.product_id,

  //   // delivery info
  //   firstName: formData.firstName, 
  //   lastName: formData.lastName,
  //   street: formData.street,
  //   country: formData.country,
  //   state: formData.state,
  //   email: formData.email,
  //   zipcode: formData.zipCode,
  //   phone: formData.phone,
  //   city: formData.city
  // };

  // console.log("pro", Orderdata)

  // //making a req for order
  // const res = await axios.post("http://localhost:3000/api/orders/create", Orderdata)


  // console.log(res.data)

  //   } catch (error) {
  //     console.error("Error dcreating order:", error)
  //   }
    

  // }




  //function for click paynow 
  const handleContinue = async (amount) => {

    //getting key
    const {data: keyData} = await axios.get("/api/v1/getKey")
    const {key} = keyData //de-structing
    console.log(key)

    //creating order
    const {data: orderData} = await axios.post("/api/v1/payment/process",{
      amount
    })
    const {order}= orderData //de-structing
    console.log(order)


    //copy from RAZORPAY for UI

    const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits.
        currency: 'INR',
        name: 'SXM integration',
        description: 'Razorpay integration',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: '/api/v1/paymentVarification', // Your success URL
        prefill: {
          name: 'XSM ',
          email: 'XSM@gmail.com',
          contact: '7900519311'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
  }


  return (
    <div className="buy-container">

      <div className="right-section">
      {/* RIGHT SECTION */}

        <div className="product-box" key={product.product_id}>
          <img src={product.image} alt={product.name} className="product-img" />

          <div className="product-info">
            <h4>{product.name}</h4>
            <p>{product.rating}</p>
            <p>{product.category}</p>
            <p>{product.brand}</p>
            <p>Prd id : {product.product_id}</p>
            <p>+  Protect Promise Fee</p>
            <p>Or Pay 3100 + 123 999</p>
            <p className="small">Seller: Retailer</p>
            <p className="price">₹{product.price} 
            <p className="offers">13% off 18 Offers available</p></p>          
          </div>

          <div className="delivery-info">
            <p>Delivery by Tomorrow</p>
            <p className="small">Open Box Delivery eligible</p>
          </div>
        </div>

         <div className="price-card">
          <h4>PRICE DETAILS</h4>
          <hr />
          <p className="row a"><span>Price (1 item)</span> <span>₹{product.price}</span></p>
          <p className="row"><span>Delivery Fee</span> <span className="green">Free</span></p>
          <hr />
          <p className="row total"><span>Total Payable</span> <span>₹{product.price}</span></p>
          <p className="savings">Your Total Savings on this order ₹421</p>
        </div>
        {/* <p className="email-note">Order confirmation email will be sent to you gmail</p> */}

        <button 
  className="continue-btn" onClick={()=> handleContinue(product.price)}
>
  CONTINUE
</button>

      </div>

      


{/* LEFT SECTION */}
      <div className="left-section">


<div className="delivery-information">
        <h2>DELIVERY INFORMATION</h2>
        {/* form */}
        <form className="form-info">
          <span>
            <input type="text" disabled placeholder="FirstName"  required 
            onChange={(e)=> setFormData({...formData, firstName: e.target.value})}/>
            <input type="text" disabled placeholder="LastName"required
          onChange={(e)=> setFormData({...formData, lastName: e.target.value})}/>

          </span>
            <input type="email" placeholder="Email" required disabled
            onChange={(e)=> setFormData({...formData, email: e.target.value})}/>

            <input type="text" placeholder="Street" required disabled
            onChange={(e)=> setFormData({...formData, street: e.target.value})}/>
            <span>
            <input type="text" placeholder="City" required disabled
            onChange={(e)=> setFormData({...formData, city: e.target.value})}/>
            <input type="text" placeholder="State" required disabled
             onChange={(e)=> setFormData({...formData, state: e.target.value})}/>
          </span>
          <span>
            <input type="text" disabled placeholder="ZipCode" 
            onChange={(e)=> setFormData({...formData, zipcode: e.target.value})}/>
            <input type="text" disabled placeholder="Country" required
            onChange={(e)=> setFormData({...formData, country: e.target.value})}/>
          </span>
          <input type="text" disabled placeholder="Phone" required
            onChange={(e)=> setFormData({...formData, phone: e.target.value})}/>

        </form>
      </div>
</div>

      
    </div>
  );
}

export default Buynow;

