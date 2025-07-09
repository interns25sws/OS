import React from "react";
import './DisplayCloth.css';

import TrendingImage1 from "../assets/TrendProductImage1.jpg";
import TrendingImage2 from "../assets/TrendProductImage2.jpg";
import TrendingImage3 from "../assets/TrendProductImage3.jpg";
import TrendingImage4 from "../assets/TrendProductImage4.jpg";
import ActiveWear from "../assets/WomensClothingImages/ActiveWear.jpeg";
import HoodiesImage from "../assets/Newhoodie.jpg";

const products = [
  {
    name: "JOG 2.0 PANTS",
    image: TrendingImage1,
  },
  {
    name: "Summer Tops ",
    image: TrendingImage2,
  },
  {
    name: "earrings",
    image: TrendingImage3,
  },
  {
    name: "Branded Shoes",
    image: TrendingImage4,
  },
  {
    name: "active wear",
    image: ActiveWear,
  },
  {
    name: "LONG SLEEVE hoodies",
    image: HoodiesImage,
  },
];

export default function ProductShowcase() {
  return (
    <section className="product-section">
      <h1 className="desc-heading">MODESTY x AESTHETIC</h1>
      <p className="section-title">WORKOUT WITH ELEGANCE & COMFORT</p>
      <div className="product-grid">
        {products.map((item, index) => (
          <div className="product-card" key={index}>
            <img src={item.image} alt={item.name} />
            <div className="product-name">{item.name}</div>
          </div>
        ))}
      </div>
      
      <div className="browse-button-container">
        <button className="browse-button" onClick={() => window.location.href = '/shop'}>
          Browse Now
        </button>
      </div>
    </section>
  );
}
