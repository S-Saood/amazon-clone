import React, { useState, useEffect } from "react";
import './Hero.css'
import hero_1 from "../../assets/hero_1.jpg";
import hero_2 from "../../assets/uber_new_high._CB537689643_4.jpg";
import hero_3 from "../../assets/hero_image.jpg";
import hero_4 from "../../assets/GW-Hero-Pc-Indoor-plants-for-home._CB803702595_6.jpg";
import hero_5 from "../../assets/Budget_3000x1200_Pc._CB803502932_5.jpg";
import "./Hero.css";


function Hero() {
  const images = [hero_1, hero_2, hero_3, hero_4, hero_5];
  const [index, setIndex] = useState(0);

  // change image every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);


  // next button logic
  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  // previous button logic
  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };


  return (
    <div className="hero">
      <img src={images[index]} alt="hero" className="hero-img" />

       {/* buttons */}
      <button className="prev" onClick={prevImage}>❮</button>
      <button className="next" onClick={nextImage}>❯</button>
    </div>
  );
}

export default Hero;
