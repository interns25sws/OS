import React from "react";
import "./Homepage.css";
import productImage from "../assets/Images/ClothImage1.jpg"; 

export default function HomePage() {
  return (
    <section className="minimalist-homepage">
      <div className="content-wrapper">
        <h1 className="headline">Effortless Style Starts Here</h1>
        <p className="subtext">Explore modern fashion tailored for you.</p>
        <button className="shop-btn">Shop Now</button>
      </div>
      <div className="image-wrapper">
        <img
          src={productImage}
          alt="Featured Product"
          className="product-image"
        />
      </div>
    </section>
  );
}
