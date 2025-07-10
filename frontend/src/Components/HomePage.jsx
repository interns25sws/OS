import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import productImage from "../assets/Images/ClothImage1.jpg";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="minimalist-homepage">
      <div className="content-wrapper">
        <h1 className="headline">Effortless Style Starts Here</h1>
        <p className="subtext">Explore modern fashion tailored for you.</p>
        <button
          className="shop-btn"
          onClick={() => navigate("/shop")}
          aria-label="Navigate to shop page"
        >
          Shop Now
        </button>
      </div>
      <div className="image-wrapper">
        <img
          src={productImage}
          alt="Featured Product"
          className="product-image"
          loading="lazy"
        />
      </div>
    </section>
  );
}
