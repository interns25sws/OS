import React from "react";
import { Link } from "react-router-dom";
import "./ItemsPage.css";
import MensClothing from "../assets/MensClothing.png";
import WomensClothing from "../assets/WomensClothing.jpeg";

export default function ItemsPage() {
  return (
    <section className="cart-section">
      <div className="cart-wrapper">
       
        <div className="cart-container">
          <h2 className="cart-title"> Mens Clothing</h2>
          <p>Mens clothing with proper set | upto 30% discount </p>
          <img src={MensClothing} alt="" />
          <Link to="/MensClothing" className="see-more-btn">
            See More
          </Link>
        </div>
        <div className="cart-container">
          <h2 className="cart-title"> Womens Clothing</h2>
          <p>Mens clothing with proper set | upto 30% discount </p>
          <img src={WomensClothing} alt="" />
          <Link to="/WomensClothing" className="see-more-btn">
            See More
          </Link>
        </div>
       
        
      </div>
    </section>
  );
}
