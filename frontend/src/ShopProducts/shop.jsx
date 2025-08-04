import React, { useEffect, useState } from "react";
import "./shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const getToken = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    return loggedInUser?.token || "";
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data]))
      .catch(() => setCategories(["All"]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");

    const url =
      selectedCategory !== "All"
        ? `http://localhost:5000/api/products?category=${encodeURIComponent(
            selectedCategory
          )}`
        : "http://localhost:5000/api/products/active";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        // If backend returns array, use data directly
        const productList = Array.isArray(data) ? data : data.products || [];
        setProducts(productList);
        setLoading(false);
      })

      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleAddToCart = (productId, qty = 1) => {
    setAddingToCart(true);

    fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ productId, quantity: qty }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Failed to add to cart");
          });
        }
        return res.json();
      })
      .then(() => {
        setCartMessage("Added to cart!");
      })
      .catch((err) => {
        console.error("Add to cart failed:", err.message);
        setCartMessage(err.message || "Error adding to cart.");
      })
      .finally(() => {
        setAddingToCart(false);
        setTimeout(() => setCartMessage(""), 3000);
      });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowFullDesc(false);
    document.body.style.overflow = "hidden";
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const nextProduct = () => {
    const idx = products.findIndex((p) => p._id === selectedProduct._id);
    const nextIdx = (idx + 1) % products.length;
    openProductModal(products[nextIdx]);
  };

  const prevProduct = () => {
    const idx = products.findIndex((p) => p._id === selectedProduct._id);
    const prevIdx = (idx - 1 + products.length) % products.length;
    openProductModal(products[prevIdx]);
  };

  const truncate = (text, len = 100) => {
    return text?.length > len ? text.slice(0, len) + "..." : text;
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
            <div
              className="shop-product-image"
              onClick={() => openProductModal(product)}
            >
              {product.images?.[0] ? (
                <img
                  src={`http://localhost:5000/images/${product.images[0]}`}
                  alt={product.name}
                />
              ) : (
                <div className="shop-no-image">No image</div>
              )}
              {product.stock === 0 && (
                <span className="out-of-stock-badge">Out of Stock</span>
              )}
            </div>
            <div className="shop-product-info">
              <h3>{product.name}</h3>
              <p className="desc">{truncate(product.description)}</p>
              <div className="info-row">
                <span className="price">${product.price.toFixed(2)}</span>
              </div>
              {product.tags && (
                <div className="tags">{product.tags.join(", ")}</div>
              )}
              <button
                onClick={() => handleAddToCart(product._id, 1)}
                disabled={addingToCart || product.stock === 0}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : addingToCart
                  ? "Adding..."
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="product-modal-overlay" onClick={closeProductModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeProductModal}>
              ×
            </button>

            <div className="modal-image">
              <img
                src={`http://localhost:5000/images/${selectedProduct.images?.[0]}`}
                alt={selectedProduct.name}
              />
            </div>

            <div className="modal-details">
              <h2>{selectedProduct.name}</h2>
              <p>
                {showFullDesc
                  ? selectedProduct.description
                  : truncate(selectedProduct.description, 150)}
                {selectedProduct.description?.length > 150 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="toggle-desc"
                  >
                    {showFullDesc ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>

              <p>
                <strong>Sizes:</strong>{" "}
                {Array.isArray(selectedProduct.sizes)
                  ? selectedProduct.sizes.join(", ")
                  : "N/A"}
              </p>

              <p>
                <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
              </p>
              <p>
                <strong>Stock:</strong>{" "}
                <span
                  style={{
                    color: selectedProduct.stock === 0 ? "red" : "green",
                  }}
                >
                  {selectedProduct.stock === 0
                    ? "Out of Stock"
                    : `${selectedProduct.stock} available`}
                </span>
              </p>

              <div className="quantity-selector">
                <label>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <button
                className="shop-add-to-cart-btn"
                onClick={() => handleAddToCart(selectedProduct._id, quantity)}
                disabled={addingToCart || selectedProduct.stock === 0}
              >
                {selectedProduct.stock === 0
                  ? "Out of Stock"
                  : addingToCart
                  ? "Adding..."
                  : "Add to Cart"}
              </button>

              <div className="modal-nav-buttons">
                <button onClick={prevProduct}>← Prev</button>
                <button onClick={nextProduct}>Next →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
