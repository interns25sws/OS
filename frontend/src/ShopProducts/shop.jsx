import React, { useEffect, useState } from "react";
import "./shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

 const getUserIdFromToken = () => {
  try {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || !loggedInUser.token) {
      console.warn("Token not found in loggedInUser.");
      return null;
    }

    const base64Payload = loggedInUser.token.split(".")[1];
    const decodedPayload = JSON.parse(atob(base64Payload));

    console.log("Decoded token payload:", decodedPayload);

    return decodedPayload.userId || decodedPayload._id || decodedPayload.id;
  } catch (err) {
    console.error("Failed to parse token", err);
    return null;
  }
};

const userId = getUserIdFromToken();


  // Static categories
  useEffect(() => {
    setCategories([
      "All",
      "Shirt",
      "T-Shirt",
      "Jeans",
      "Shoes",
      "Shorts",
      "Slides",
    ]);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    const url =
      selectedCategory !== "All"
        ? `http://localhost:5000/api/products?category=${encodeURIComponent(
            selectedCategory
          )}`
        : "http://localhost:5000/api/products";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleAddToCart = (productId) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity: 1 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add to cart");
        return res.json();
      })
      .then((data) => {
        setCartMessage(data.message || "Added to cart");
        setTimeout(() => setCartMessage(""), 3000);
      })
      .catch(() => {
        setCartMessage("Error adding to cart.");
        setTimeout(() => setCartMessage(""), 3000);
      });
  };

  return (
    <div className="shop-wrapper">
      <h1 className="shop-header">🛒 Explore Our Products</h1>

      <div className="shop-filter-bar">
        <label htmlFor="category-select">Category:</label>
        <select
          id="category-select"
          className="shop-category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {cartMessage && <div className="shop-cart-message">{cartMessage}</div>}
      {loading && <div className="shop-loading">Loading products...</div>}
      {error && <div className="shop-error">{error}</div>}

      <div className="shop-product-grid">
        {products.map((product) => (
          <div className="shop-product-card" key={product._id}>
            <div className="shop-product-image">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} />
              ) : (
                <div className="shop-no-image">No image</div>
              )}
            </div>
            <div className="shop-product-info">
              <h3>{product.name}</h3>
              <p className="desc">{product.description}</p>
              <div className="info-row">
                <span className="sizes">{product.sizes.join(", ")}</span>
                <span className="price">${product.price.toFixed(2)}</span>
              </div>
              <button
                className="shop-add-to-cart-btn"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
