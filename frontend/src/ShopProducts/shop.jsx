import React from "react";
import DisplayImage from "../assets/shopimages/maindisplay.jpg";
import image1 from "../assets/Images/oversized.jpg"
import image2 from "../assets/Images/polos.jpg"
import image3 from "../assets/Images/Newhoodie.jpg"
import "./shop.css";

const products = [
  {
    id: 1,
    name: "Custom Over-sized",
    category: "T-shirt",
    price: 299,
    image: image1,
  },
  {
    id: 1,
    name: "Polo ",
    category: "T-shirt",
    price: 799,
    image: image2,
  },
  {
    id: 1,
    name: "Hoodies",
    category: "T-shirt",
    price: 1199,
    image: image3,
  },
];

export default function Shop() {
  return (
    <div className="shop-section">
      <section className="shop-container">
        <img src={DisplayImage} alt="Main Display" className="shop-image" />
        <h1 className="shop-heading">Style yourself with proper fit</h1>
      </section>

      <section className="shop-products">
        <div className="shop-product-types">
          {products.map((product) => (
            <div className="product-card-all" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-price">₹ {product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
