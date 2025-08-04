import React, { useEffect, useState } from "react";
import "./cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    return user?.token || "";
  };

  useEffect(() => {
    const handleUserChange = () => {
      const newToken = getToken();
      setToken(newToken);
    };

    handleUserChange();
    window.addEventListener("storage", handleUserChange);
    const interval = setInterval(handleUserChange, 1000);

    return () => {
      window.removeEventListener("storage", handleUserChange);
      clearInterval(interval);
    };
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
      setError("");
    } catch {
      setError("Unable to load cart.");
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
    else setCart(null);
  }, [token]);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    setUpdatingItemId(productId);
    try {
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      const updated = await res.json();
      setCart(updated.cart);
    } catch {
      alert("Failed to update quantity");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const removeItem = async (productId) => {
    setUpdatingItemId(productId);
    try {
      const res = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Failed to remove item");
      await fetchCart();
      setMessage("Item removed from cart");
    } catch {
      setError("Error removing item");
    } finally {
      setUpdatingItemId(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const calculateTotal = () => {
    return cart?.items?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) || 0;
  };

  if (loading) return <div className="cart-loading">Loading your cart...</div>;
  if (error) return <div className="cart-error">{error}</div>;
  if (!cart || cart.items.length === 0) return <div className="cart-empty">🛒 Your cart is empty.</div>;

 return (
  <section className="cart-wrapper ">
    <header className="cart-header">🛒 Shopping Cart</header>

    {message && <div className="cart-toast">{message}</div>}

    <div className="cart-items">
      {cart.items.map((item) => (
        <div className="cart-item" key={item.productId._id}>
          <div className="cart-image">
            <img
              src={`http://localhost:5000/images/${item.productId.images?.[0]}`}
              alt={item.productId.name}
            />
          </div>

          <div className="cart-details">
            <h3>{item.productId.name}</h3>
            <p className="cart-price">
              ${item.productId.price.toFixed(2)} × {item.quantity} ={" "}
              <strong>${(item.productId.price * item.quantity).toFixed(2)}</strong>
            </p>

            <div className="cart-actions">
              <button
                disabled={updatingItemId === item.productId._id}
                onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
              >
                −
              </button>

              <input
                type="number"
                min="1"
                value={item.quantity}
                disabled={updatingItemId === item.productId._id}
                onChange={(e) => updateQuantity(item.productId._id, parseInt(e.target.value))}
              />

              <button
                disabled={updatingItemId === item.productId._id}
                onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
              >
                +
              </button>

              <button
                className="remove-btn"
                disabled={updatingItemId === item.productId._id}
                onClick={() => removeItem(item.productId._id)}
              >
                {updatingItemId === item.productId._id ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <footer className="cart-summary">
      <h2>Total: ${calculateTotal().toFixed(2)}</h2>
      <button className="checkout-btn">Proceed to Checkout</button>
    </footer>
  </section>
);

};

export default Cart;
