import React, { useState, useEffect } from "react";
import "./Product.css";
import axios from 'axios'
import { Link } from "react-router-dom";
import Hero from '../Hero/Hero.jsx'



function Product({query}) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetchproducts();
  }, []);



  //fetching products from backend to home page
const fetchproducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cards`);
        // console.log("All products: ", res.data)
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } 
    };

    //search functionality explaination
  // const filteredPro = products.filter((product) => product.heading.includes("Toffee"));
  // console.log("Filtering: ",filteredPro)


  return (
    <>
    <div className="main-container-product">
      {/* <div className="heros">
        <img className="hero_1" src={hero_1} alt="hero_1" />
      </div> */}
      <Hero />

      <section className="product-section">
        <div className="Card-container">
          

          {products.map((product) => {
            
            //filter for search functionality
            const filterProducts = product.products.filter((p)=>
            !query ? true : p.name.toLowerCase().includes(query.toLowerCase())
          )
          //skip the card if query not match
            if(filterProducts.length === 0)  return null //show all products if no query
            

            return (
            <div className="card" key={product.card_id}>
              <div className="card-box heading">{product.title}</div>
              <div className="card-box images">
                {product.products.map((pro)=>(
                  <Link to={`/product/${pro.product_id}`}className="img1" key={product.product_id}>
                  <img className="image" src={pro.image_url} alt={"imag1"} />
                  {/* <p>{pro.product_id}</p> */}
                  <p className="name product-name-container">{pro.name}</p>
                </Link>
                ))}
                
                
              </div>
              <div className="card-box seeall">
                <p>{product.subtitle}</p>
              </div>
            </div>
            )
          })}
        </div>


        <div className="slide-container">
          {products.map((product) => (
            <div>
              <div className="headig"><h5>{product.title}</h5></div>
            <div className="slide-box" key={product.product_id}>
              {product.products.map((pro)=> (
                <Link to="/detail" className="slide-card">
                <img src={pro.image_url} alt={"image1"} />
                <div className="price-name">
                  <p className="price-name-slide">{pro.name}</p>
                  <p className="price-sign price-name-slide-price"><span className="sign-pri ">₹</span>{pro.price}</p>
                </div>
              </Link>
              ))}
              
            </div>
            </div>
          ))}
        </div>

        
      </section>
    </div>
    </>
  );
}

export default Product;
