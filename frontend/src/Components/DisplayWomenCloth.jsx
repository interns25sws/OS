import React from "react";
import "./Mens.css";
import WomenDisplay1 from "../assets/WomensDiplayimage1.jpg";
import WomenDisplay2 from "../assets/WomensDiplayimage2.jpg";
import WomenDisplay3 from "../assets/WomensDiplayimage3.jpg";

const items = [
  {
    title: "Casual Wear",
    image: WomenDisplay1,
    price: "$49.99",
  },
  {
    title: "Tops & Frogs",
    image: WomenDisplay2,
    price: "$129.99",
  },
  {
    title: "Smart Jackets",
    image: WomenDisplay3,
    price: "$89.99",
  },
];

const SummerCollection = () => {
  return (
    <div className="collection-container">
      <h1 className="collection-title">Women's Branded Collection</h1>
      <p className="collection-description">
        Stride with Confidence, Grace, and Style
      </p>

      <div className="collection-grid">
        {items.map((item, index) => (
          <div className="collection-item" key={index}>
            <img
              src={item.image}
              alt={item.title}
              className="collection-image"
            />
            <p className="collection-item-title">{item.title}</p>
            <p className="collection-item-price">{item.price}</p>
            <button className="browse-button">Browse Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummerCollection;
