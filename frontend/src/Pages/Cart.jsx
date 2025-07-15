import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.css";

export default function Cart({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  // Get token from user object
  const token = user?.token;

  useEffect(() => {
    if (!user || !user._id) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/api/cart/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Cart response:", response.data);

      const items =
        response.data.items?.map((item) => ({
          id: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })) || [];

      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart:", error.response?.data || error.message);
      setError("Failed to load cart items.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      await axios.post(
        `/api/cart/${user._id}`,
        {
          productId: id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: newQuantity - item.quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error.response?.data || error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`/api/cart/${user._id}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item:", error.response?.data || error.message);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

      {loading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : cartItems.length === 0 ? (
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
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
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
