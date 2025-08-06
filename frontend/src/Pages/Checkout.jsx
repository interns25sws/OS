import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
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
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userToken = storedUser?.token || "";
    if (!userToken) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    setToken(userToken);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [cartRes, userRes] = await Promise.all([
          fetch("http://localhost:5000/api/cart", { headers }),
          fetch("http://localhost:5000/api/users/me", { headers }),
        ]);

        if (!cartRes.ok) throw new Error("Failed to fetch cart");
        if (!userRes.ok) throw new Error("Failed to fetch user");

        const cartData = await cartRes.json();
        const userData = await userRes.json();
        console.log("User data from backend:", userData);

        setCart(cartData);

        // Extract first and last name from userData.name if it exists
        let fetchedFirstName = "";
        let fetchedLastName = "";
        if (userData.name) {
          const nameParts = userData.name.split(" ");
          fetchedFirstName = nameParts[0] || "";
          fetchedLastName = nameParts.slice(1).join(" ") || ""; // Join remaining parts for last name
        }

        setUser((prev) => ({
          ...prev,
          firstName: fetchedFirstName, // Set from parsed name
          lastName: fetchedLastName,   // Set from parsed name
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          pincode: userData.pincode || "",
          country: userData.country || "India",
        }));

        setUserLoaded(true); // Mark user as loaded
      } catch (err) {
        console.error(err);
        setError("Unable to load cart or user details.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Checkout failed");

      setSuccess("✅ Order placed successfully!");
      setCart(null);

      setTimeout(() => {
        navigate("/thank-you");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("❌ Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((acc, item) => {
      const product = item?.productId;
      return acc + (product?.price || 0) * item.quantity;
    }, 0);
  };

  // Final loading/error check
  if (loading || !userLoaded) return <div className="p-6">Loading checkout...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT - USER INFO */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["firstName", "lastName"].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={field}
                value={user[field]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}
        </div>

        {["email", "phone", "address"].map((field) => (
          <div className="mt-4" key={field}>
            <label className="block mb-1 font-medium capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {field === "address" ? (
              <textarea
                name={field}
                value={user[field]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 min-h-[80px]"
              ></textarea>
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={user[field]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            )}
          </div>
        ))}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {["city", "state", "pincode", "country"].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={user[field]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}
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
        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-800 rounded">
            {error}
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
          disabled={checkoutLoading || success}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {checkoutLoading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
