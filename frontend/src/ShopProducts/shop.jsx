import React, { useEffect, useState } from "react";
import "./shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const getUserIdFromToken = () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser?.token) return null;
      const payload = JSON.parse(atob(loggedInUser.token.split(".")[1]));
      return payload.userId || payload._id || payload.id;
    } catch {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    setCategories(["All", "Shirt", "T-Shirt", "Jeans", "Shoes", "Shorts", "Slides"]);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");

    const url =
      selectedCategory !== "All"
        ? `http://localhost:5000/api/products?category=${encodeURIComponent(selectedCategory)}`
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
    setAddingToCart(true);

    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity }),
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
      })
      .finally(() => {
        setAddingToCart(false);
      });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowFullDesc(false);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
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
    if (!text) return "";
    return text.length > len ? text.slice(0, len) + "..." : text;
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
            <option key={cat} value={cat}>{cat}</option>
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
                <img src={product.images[0]} alt={product.name} />
              ) : (
                <div className="shop-no-image">No image</div>
              )}
            </div>
            <div className="shop-product-info">
              <h3>{product.name}</h3>
              <p className="desc">{truncate(product.description)}</p>
              <div className="info-row">
                <span className="sizes">{product.sizes.join(", ")}</span>
                <span className="price">${product.price.toFixed(2)}</span>
              </div>
              {product.tags && <div className="tags">{product.tags.join(", ")}</div>}
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

      {/* Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={closeProductModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeProductModal}>×</button>

            <div className="modal-image">
              <img src={selectedProduct.images?.[0]} alt={selectedProduct.name} />
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
              <p><strong>Sizes:</strong> {selectedProduct.sizes.join(", ")}</p>
              <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>

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
                onClick={() => handleAddToCart(selectedProduct._id)}
                disabled={addingToCart}
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
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
