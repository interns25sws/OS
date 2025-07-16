import React, { useEffect, useState } from "react";
import "./shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data]))
      .catch(() => setCategories(["All"]));
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    setLoading(true);
    setError("");
    const url =
      selectedCategory && selectedCategory !== "All"
        ? `http://localhost:5000/api/products?category=${selectedCategory}`
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

  // Handle Add to Cart click
const userId = "68766e2fe0273da7925dcb70"; // Replace this with dynamic user ID in production

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
      setCartMessage(data.message);
      setTimeout(() => setCartMessage(""), 3000);
    })
    .catch((err) => {
      console.error("❌ Error adding to cart:", err);
      setCartMessage("Error adding to cart.");
      setTimeout(() => setCartMessage(""), 3000);
    });
};



  if (loading) return <div className="shop-loading">Loading products...</div>;
  if (error) return <div className="shop-error">{error}</div>;

  return (
    <div className="shop-container-">
      <h1 className="shop-title">Shop Products</h1>

      {/* Category filter */}
      <div>
        <label htmlFor="category-select">Filter by Category: </label>
        <select
          id="category-select"
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

      {/* Show cart message */}
      {cartMessage && <div className="cart-message">{cartMessage}</div>}

      <div className="product-grid-db">
        {products.map((product) => (
          <div className="product-card-db" key={product._id}>
            <div className="product-image-wrapper">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-image-db"
                />
              ) : (
                <div className="no-image">No image</div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Sizes:</strong> {product.sizes.join(", ")}
              </p>
              <button
                className="add-to-cart-btn"
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
