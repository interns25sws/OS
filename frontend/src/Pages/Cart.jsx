import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

import TrendproductImage1 from "../assets/Images/TrendproductImage1.jpg";
import TrendproductImage4 from "../assets/Images/TrendproductImage4.jpg";

const initialCartItems = [
  {
    id: 1,
    name: "JOG 2.0 PANTS",
    image: TrendproductImage1,
    price: 49.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Branded Shoes",
    image: TrendproductImage4,
    price: 89.99,
    quantity: 2,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1
        onClick={() => navigate("/")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          color: hover ? "#007bff" : "black",
          transition: "color 0.3s ease",
        }}
      >
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
