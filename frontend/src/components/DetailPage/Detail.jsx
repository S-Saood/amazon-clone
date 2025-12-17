import React, { useEffect, useState } from "react";
import "./Detail.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

// function Detail({setCartCount}) { //product pass as prop
//     const {id} = useParams()

function Detail({ setCartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  // Product : add to cart function
  async function handleAddToCart(product) {
    const user_id = parseInt(localStorage.getItem("user_id")); //convert to integer

    //store product till user login
    localStorage.setItem("PendingProduct", JSON.stringify(product));

    if (!user_id) {
      // check id in localstorage
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    //if logged in proceed to add product
    try {
      const cartItem = {
        user_id: user_id,
        product_id: product.product_id,
        quantity: 1,
      };

      const res = await axios.post("http://localhost:3000/api/cart", cartItem);
      console.log("Added to cart", res.data); //response from backend

      //update count
      setCartCount((prev) => prev + 1);

      if (res.data) {
        //popup is res received
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }

      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  //reveive req for detial
  useEffect(() => {
    //Feth data now
    const fetchproductsdetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data);
        console.log("detail data:", res.data);
      } catch (error) {
        console.error("Error fetchinf details", error.message);
      }
    };
    fetchproductsdetails();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <section className="description">
      {/* {added && <div className="popup"> Product added to cart!</div>} */}

      <div className="containerho">
        {/* Left Section */}
        {/* {product.map((pro, i)=> ( */}
        <React.Fragment>
          <div className="child-container a">
            <div className="images-multiple">
              {product.images &&
                product.images
                  .slice(0, 5)
                  .map((url, i) => (
                    <img key={i} src={url} alt={product.name} />
                  ))}
            </div>
            <div className="image-section">
              <p className="p-gray">{product.name}</p>
              <img
                src={product.main_image}
                className="cover-img"
                alt="product"
              />
              <p>Click to see full view</p>
            </div>
          </div>

          {/*Middle-Section*/}

          <div className="child-container b">
            <div className="content">
              <div className="content-box detail">
                <h2>{product.description}</h2>
                <p className="blue">Visit the VIDA Store</p>
                <div className="inline">
                  <p>product d: {product.product_id}</p>
                  <div className="input-reviews">
                    {product.rating >= 5 ? (
                      <p className="stars">
                        {" "}
                        reviews{product.reviews} ⭐⭐⭐⭐⭐
                      </p>
                    ) : product.rating >= 4 ? (
                      <p className="stars">
                        {" "}
                        reviews{product.reviews} ⭐⭐⭐⭐
                      </p>
                    ) : product.rating >= 3 ? (
                      <p className="stars"> reviews{product.reviews} ⭐⭐⭐</p>
                    ) : product.rating >= 2 ? (
                      <p className="stars"> reviews{product.reviews} ⭐⭐</p>
                    ) : product.rating >= 1 ? (
                      <p className="stars"> reviews{product.reviews} ⭐</p>
                    ) : (
                      <p className="stars">
                        {" "}
                        reviews{product.reviews} No rating yet
                      </p>
                    )}
                    <p>rating - {product.rating}</p>
                  </div>

                  <p>Brand - {product.brand}</p>
                  <p>category - {product.category}</p>
                  <p className="choice">Amazon's Choice</p>

                  <p>2K+ bought in past month</p>
                </div>
                <hr className="line-bold" />
              </div>

              <div className="content-box offers">
                <div className="offer-box tax">
                  <h3 className="price-signing">
                    <span className="sing-pri">₹</span>
                    {product.price}
                  </h3>
                  <p>Inclusive of all taxes</p>
                  <p>
                    <b>EMI</b> starts at ₹6,755. No Cost EMI available
                  </p>
                  <p>Great Indian Festival</p>
                </div>

                <div className="offer-box card">
                  <p className="offer-head">Offers %</p>
                  <div className="bank-offer">
                    <div className="boxoff">
                      <p>
                        <b>Bank Offer</b>
                      </p>
                      <p>Upto ₹4,000.00 discount on select Credit Cards</p>
                      <p>41 offers</p>
                    </div>
                    <div className="boxoff">
                      <p>
                        <b>Cashback</b>
                      </p>
                      <p>Upto ₹4,200.00 cashback as Amazon Pay Balance</p>
                      <p>1 offer</p>
                    </div>
                    <div className="boxoff">
                      <p>
                        <b>No Cost EMI</b>
                      </p>
                      <p>
                        Upto ₹6,304.04 EMI interest savings on Amazon Pay ICICI
                      </p>
                      <p>1 offer</p>
                    </div>
                    <div className="boxoff">
                      <p>
                        <b>Partner Offers</b>
                      </p>
                      <p>
                        Get GST invoice and save up to 28% on business
                        purchases.
                      </p>
                      <p>1 offer</p>
                    </div>
                  </div>
                </div>

                <div className="offer-box delivery"></div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="child-container price">
            <div className="price-section">
              <div className="top-price">
                <h3 className="price-signing">
                  <span className="sing-pri">₹</span>
                  {product.price}
                </h3>
                <p>FREE delivery 12 - 16 </p>
                <p>September. Order within 17 hrs 49 mins.</p>
                <p>
                  <b style={{ color: "#2162a1" }}>Details</b>
                </p>
                <p className="gap">Delivering to Dehradun 248001 -</p>
                <p className="gap-no">Update location</p>
              </div>

              <div className="middle-price">
                <p>Ships from MEHROTRA ENTERPRISES VIDA</p>
                <p className="sold">Sold by MEHROTRA ENTERPRISES VIDA</p>
                <p className="ptm">Payment Secure transaction</p>
              </div>

              <div className="bottom-price">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="cart"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/buynow/${product.product_id}`}
                  className="buynow-detail"
                >
                  <button className="buy">Buy Now</button>
                </Link>

                <hr />
                <button id="last-btn">Add to Wish List</button>
              </div>
            </div>
          </div>
        </React.Fragment>
        {/* ))} */}
      </div>
    </section>
  );
}

export default Detail;
