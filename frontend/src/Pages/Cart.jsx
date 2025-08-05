import React, { useEffect, useState } from "react";

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
      const res = await fetch(
        `http://localhost:5000/api/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
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
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => {
      const product = item.productId;
      if (!product || !product.price) return acc;
      return acc + product.price * item.quantity;
    }, 0);
  };

  if (loading)
    return (
      <div className="text-center py-10 text-lg bg-orange-50 border border-dashed border-yellow-400 rounded-md m-4">
        Loading your cart...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-lg bg-orange-50 border border-dashed border-yellow-400 rounded-md m-4">
        {error}
      </div>
    );

  if (!cart || cart.items.length === 0)
    return (
      <div className="text-center py-10 text-lg bg-orange-50 border border-dashed border-yellow-400 rounded-md m-4">
        🛒 Your cart is empty.
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto p-6 bg-white bg-opacity-90 rounded-2xl shadow-2xl backdrop-blur-md mt-8 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🛒 Shopping Cart
      </h2>

      {message && (
        <div className="text-center p-4 bg-green-50 text-green-800 border-l-4 border-green-500 rounded-md mb-6 font-medium">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {cart.items.map((item, index) => {
          const product = item?.productId;
          if (!product) return null;

          return (
            <div
              key={product._id || index}
              className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="w-28 h-28 flex-shrink-0">
                <img
                  src={
                    product.images?.[0]
                      ? `http://localhost:5000/images/${product.images[0]}`
                      : "/placeholder.png"
                  }
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 w-full text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {product.price.toFixed(2)} × {item.quantity} ={" "}
                  <strong>{(product.price * item.quantity).toFixed(2)}</strong>
                </p>

                <div className="flex justify-center sm:justify-start items-center flex-wrap gap-3 mt-4">
                  <button
                    disabled={updatingItemId === product._id}
                    onClick={() =>
                      updateQuantity(product._id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    disabled={updatingItemId === product._id}
                    onChange={(e) =>
                      updateQuantity(product._id, parseInt(e.target.value))
                    }
                    className="w-16 text-center border border-gray-300 rounded py-1 px-2"
                  />

                  <button
                    disabled={updatingItemId === product._id}
                    onClick={() =>
                      updateQuantity(product._id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>

                  <button
                    disabled={updatingItemId === product._id}
                    onClick={() => removeItem(product._id)}
                    className="px-4 py-1 text-white bg-red-500 hover:bg-red-600 rounded transition font-semibold"
                  >
                    {updatingItemId === product._id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-right mt-10 sm:mt-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Total: ₹{calculateTotal().toFixed(2)}
        </h2>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all shadow-md">
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
