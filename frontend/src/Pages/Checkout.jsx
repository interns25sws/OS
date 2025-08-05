import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    return user?.token || "";
  };

  useEffect(() => {
    const newToken = getToken();
    setToken(newToken);
  }, []);

  useEffect(() => {
    const fetchCartAndUser = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch cart
        const cartRes = await fetch("http://localhost:5000/api/cart", { headers });
        if (!cartRes.ok) throw new Error("Failed to fetch cart");
        const cartData = await cartRes.json();
        setCart(cartData);

        // Fetch user
        const userRes = await fetch("http://localhost:5000/api/users/me", { headers });
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        setUser((prev) => ({
          ...prev,
          ...userData,
        }));
      } catch (err) {
        setError("Unable to load cart or user.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCartAndUser();
  }, [token]);

  const handleInputChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user }),
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

  if (loading) return <div className="p-6">Loading checkout...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT - USER INFO */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 min-h-[80px]"
            placeholder="Street, area, etc."
          ></textarea>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={user.pincode}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={user.country}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* RIGHT - ORDER SUMMARY */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {success && (
          <div className="p-4 mb-4 bg-green-100 text-green-800 rounded">
            {success}
          </div>
        )}

        <ul className="divide-y">
          {cart?.items.map((item, i) => {
            const product = item?.productId;
            if (!product) return null;

            return (
              <li key={i} className="flex justify-between py-3">
                <div>
                  <div className="font-medium">{product.title}</div>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="font-semibold">
                  ₹{(product.price * item.quantity).toFixed(2)}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="text-right mt-6 text-lg font-semibold">
          Total: ₹{calculateTotal().toFixed(2)}
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
