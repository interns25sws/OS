import React from "react";
import useInView from "../hooks/useInView";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import productImage from "../assets/Images/ClothImage1.jpg";

export default function HomePage() {
    const [ref, isInView] = useInView();
  const navigate = useNavigate();

  return (
    <div ref={ref} className={`fade-up ${isInView ? "animate" : ""}`}>
      {/* your content */}
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
          className="product-image-display"
          loading="lazy"
          />
      </div>
    </section>
          </div>
  );
}
