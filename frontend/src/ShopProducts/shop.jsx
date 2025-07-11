import React from "react";
import DisplayImage from "../assets/shopimages/maindisplay.jpg";
import "./shop.css";

export default function Shop() {
  return (
    <div className="shop-section">
      <section className="shop-container">
        <img src={DisplayImage} alt="Main Display" className="shop-image" />
        <h1 className="shop-heading">Style yourself with proper fit</h1>
      </section>

      <section>
        <h2 className="shop-subheading">Our Products</h2>
        
      </section>
    </div>
  );
}
