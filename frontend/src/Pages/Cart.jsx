  import React, { useEffect, useState } from "react";
  import axios from "axios";

  const Cart = ({ token }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCart = async () => {
      setLoading(true);
      try {
        // ✅ No need for userId – backend gets user from token
        const res = await axios.get("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    const updateQuantity = async (productId, delta) => {
      try {
        await axios.post(
          "/api/cart",
          { productId, quantity: delta },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId._id === productId
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item
          )
        );
      } catch (err) {
        console.error("Update error:", err);
      }
    };

    const removeItem = async (productId) => {
      try {
        await axios.delete(`/api/cart/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems((prev) => prev.filter((item) => item.productId._id !== productId));
      } catch (err) {
        console.error("Remove error:", err);
      }
    };

    useEffect(() => {
      fetchCart();
    }, []);

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div className="cart">
        {cartItems.map((item) => (
          <div key={item.productId._id} className="cart-item">
            <img src={item.productId.image} alt={item.productId.name} height={50} />
            <div>{item.productId.name}</div>
            <div>₹{item.productId.price}</div>
            <div>
              <button onClick={() => updateQuantity(item.productId._id, -1)}>-</button>
              {item.quantity}
              <button onClick={() => updateQuantity(item.productId._id, 1)}>+</button>
            </div>
            <button onClick={() => removeItem(item.productId._id)}>Remove</button>
          </div>
        ))}
      </div>
    );
  };

  export default Cart;
