import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';


function Cart({setCartCount, cartCount}){
  const [cartItems, setCartItems] = useState([]);
  const [suggested, setSuggested] = useState([]); //for below card row(suggested)

    const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!user_id) return;
    fetchCart(); //calling fetch function 
    fetchSuggested();//calling suggested function
  }, []);



//fetch product when added also render & update header count
async function fetchCart() {
      const user_id = localStorage.getItem("user_id")

      try {
        const res = await axios.get(`http://localhost:3000/api/cart/${user_id}`);
        setCartItems(res.data.cart);
        // Calculate total quantity from database
      const totalCount = res.data.cart.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalCount)
        console.log("cart api res:", res.data);
      } catch (error) {
        console.error("error fetching cart", error);
      }
    }



     // Increment quantity
  async function handleIncrement(proid) {
    try {
      await axios.put(`http://localhost:3000/api/cart/increment/${proid}`, { user_id });
      fetchCart(); // refresh cart and count
    } catch (err) {
      console.error("Error incrementing item:", err);
    }
  }
  



 // Decrement quantity
  async function handleDecrement(proid, cartCount) {
    const user_id = localStorage.getItem("user_id")

    try {
      //check an dpopup
      if(cartCount === 1){
        console.log("cartcount:", cartCount)
        const confermation = window.confirm("Do you really want to delete?")
      if(!confermation) return
      }
        
        //proceed to decrement
      await axios.put(`http://localhost:3000/api/cart/decrement/${proid}`, { user_id: localStorage.getItem("user_id") });
      fetchCart(); // refresh cart and count
    } catch (err) {
      console.error("Error decrementing item:", err);
    }
  }
  


  //fetching random products from backend 
//   async function fetchSuggested() {
//   try {
//     const res = await axios.get("http://localhost:3000/api/detail");
//     console.log("Suggested products:", res.data);
//     setSuggested(res.data)
//   } catch (err) {
//     console.error("Error fetching suggested products:", err);
//   }
// }


//products to render in cart page in below
async function fetchSuggested() {

  try {
    const res = await axios.get(`http://localhost:3000/api/cart`)
    console.log("suggesting products:", res.data)
    setSuggested(res.data.cart)
  } catch (error) {
    console.error("Error on suggested:", error)
  }
}


  return (
    <div className="cart-file">
      <div className="topLeftCart">
        <div className="topLeftCartTitle">Shopping Cart</div>

        <div className="Deselect priceLeftcart">
          selected all items
          <p className="">Price</p>
        </div>
        <hr />

        <div className="cartsItemDev">
          {cartItems && cartItems.length === 0 ? (
            <div className="empty">
            <p className="emptyii">Your cart is empty!</p>
            <img src="https://img.freepik.com/premium-vector/modern-design-concept-no-product-found-cart-design_637684-219.jpg" />
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div className="cartItemBlock"  key={`${item.product_id}-${index}`}>
                <div className="cartItemLeftBlock">
                  <div className="cartItemLeftImgBlock">
                    <img className="cartItemLeftImg" src={item.main_image} />
                  </div>

                  <div className="cartItemLeftDetail">
                    <div className="cartItemLeftDetailName">
                      {item.product_name}
                    </div>
                    <p>{item.description}</p>
                    <p>{item.product_price}</p>
                    <p>{item.rating}⭐⭐</p>

                    <div className="inStock">
                      In stock <span className="prime">Amazon Prime</span>
                    </div>
                    <div className="freeShoping">
                      Eligible for Free Shipping
                    </div>
                    <div className="removeFromCart">
                      <button onClick={()=> handleIncrement(item.product_id)}><AddIcon /> </button>
                      <p>{item.quantity}</p>
                      <button onClick={()=> handleDecrement(item.product_id, item.quantity)}><DeleteIcon/></button>
                    </div>

          <Link to={`/buynow/${item.product_id}`} className="proceeedToBuy">
          <button className="proceedtobuybutton">Proceed to Buy</button>
        </Link>                  </div>
                </div>

                <div className="pese">
                  <p className="festival">Great Indian festival</p>
                  <h5>₹{item.product_price}</h5>
                  <p className="line-through"> MRP: 24900.00</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="your-items-cart">
          <h3>Your Items</h3>
          <div className="container-your-cart">
            <div className="your-items-button">
            <button>interest</button>
            <button>nike</button>
            <button>products</button>
            <button>Brans</button>
            <button>campus</button>
            <button>campus</button>
            <button>campus</button>
            <button>campus</button>
            <button>campus</button>
            <button>campus</button>
            </div>
            
            <div className="prodcust-conatiner-your-items" >
              {suggested.map((item, index) =>(
                <div className="products-your-items"  key={`${item.product_id}-${index}`} >
                <div className="your-items-box ">
                  <img src={item.main_image} alt="image" />
                </div>
                <div className="your-items-box text">
                  <p className="bold">{item.name}</p>
                  <p>{item.long_desc}</p>
                  <p className="bold">{item.price}</p>
                  <p>{item.rating}⭐⭐</p>
                  <button>Add</button>
                  <p>see more like this </p>
                  <p>delete </p>
                  <p>Add to wishlist</p>
                </div>
                  </div>


            ))}

                

              
              
                  
            
              
              
            
            </div>
          </div>
        </div>
      </div>

      <div className="topRightCart">
        <div className="subTotalTitle">
          Subtotal 
          <span className="count-item"> 
            (Items: {cartCount}) </span>
          <span className="subTotaltitlteSpan">
            Rs : {cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0)}
            </span>
        </div>
        <div className="gidtAddto">
          <input type="checkbox" />
          <div className="giftContain">This order Contains a gift</div>
        </div>
        <Link to="" className="proceeedToBuy">
          <button className="proceedtobuybutton sub">Proceed to Buy</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
