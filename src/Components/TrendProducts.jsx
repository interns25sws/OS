import React from "react";
import { Link } from "react-router-dom";
import "./TrendProduct.css";
import TrendingImage from "../assets/Trending.jpg";
import TrendProduct1 from "../assets/TrendproductImage1.jpg";
import TrendProduct2 from "../assets/TrendproductImage2.jpg";
import TrendProduct3 from "../assets/TrendproductImage3.jpg";
import TrendProduct4 from "../assets/TrendproductImage4.jpg";

export default function TrendProducts() {
  return (
    <section className="trend-section">
      <div className="trend-productsImage">
        <img src={TrendingImage} alt="Trending Image" />
      </div>
      <div className="trending-products-container">
        <div className="trending-products">
          <div className="trend_product" data-label="Baggy Jeans">
            <img src={TrendProduct1} alt="Trend products" />
          </div>
          <div className="trend_product" data-label="Summer Dresses">
            <img src={TrendProduct2} alt="Trend products" />
          </div>
          <div className="trend_product" data-label="Earrings">
            <img src={TrendProduct3} alt="Trend products" />
          </div>
          <div className="trend_product" data-label="Chic Flats">
            <img src={TrendProduct4} alt="Trend products" />
          </div>
        </div>
        <h1> reflects the identity and unique values of a brand</h1>
      </div>
    </section>
  );
}
