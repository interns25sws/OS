import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const getToken = () => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(userData?.user); // Set user details
    return userData?.token || "";
  };

  useEffect(() => {
    const newToken = getToken();
    setToken(newToken);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCart(data);
      } catch (err) {
        setError("Unable to load cart.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCart();
  }, [token]);

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Checkout failed");

      setSuccess("✅ Order placed successfully!");
      setCart(null);

      setTimeout(() => {
        navigate("/thank-you");
      }, 2000);
    } catch (err) {
      setError("Checkout failed.");
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;

    return cart.items.reduce((acc, item) => {
      const product = item?.productId;
      if (!product || product.price == null) return acc;
      return acc + product.price * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading checkout...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
        🧾 Checkout Summary
      </h1>

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT - User Info */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            👤 Customer Info
          </h2>
          {user ? (
            <div className="space-y-3 text-gray-700">
              <div>
                <span className="font-medium">Name:</span> {user.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {user.email}
              </div>
              {user.phone && (
                <div>
                  <span className="font-medium">Phone:</span> {user.phone}
                </div>
              )}
              {user.address && (
                <div>
                  <span className="font-medium">Address:</span> {user.address}
                </div>
              )}
              {/* Add more fields if available */}
            </div>
          ) : (
            <p className="text-gray-500">No user data found.</p>
          )}
        </div>

        {/* RIGHT - Product Info */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🛍️ Order Details
          </h2>

          <ul className="space-y-4 mb-6">
            {cart?.items.map((item, i) => {
              const product = item?.productId;
              if (!product) return null;

              return (
                <li
                  key={i}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="text-gray-700">
                    <span className="font-semibold">{product.title}</span> ×{" "}
                    <span className="text-gray-600">{item.quantity}</span>
                  </div>
                  <div className="text-gray-800 font-medium">
                    ₹{(product.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-between items-center text-xl font-bold text-gray-800 border-t pt-4 mb-6">
            <span>Total:</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold transition duration-200"
          >
            ✅ Place Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
