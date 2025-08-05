import React, { useEffect, useState } from "react";

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
        ? `http://localhost:5000/api/products/active?category=${encodeURIComponent(
            selectedCategory
          )}`
        : "http://localhost:5000/api/products/active";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 drop-shadow-md">
          🛒 Explore Our Products
        </h1>

        {/* Filter */}
        <div className="flex justify-center items-center mb-10">
          <label htmlFor="category" className="mr-2 text-gray-700 font-medium">
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Cart Message */}
        {cartMessage && (
          <div className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded mb-6 text-center max-w-md mx-auto shadow">
            {cartMessage}
          </div>
        )}

        {/* Loading & Error */}
        {loading && (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        )}
        {error && (
          <div className="text-center text-red-600 text-lg">{error}</div>
        )}

        {/* Product Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group border border-gray-100"
            >
              {/* Image */}
              <div
                className="relative h-[350px] cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                {product.images?.[0] ? (
                  <img
                    src={`http://localhost:5000/images/${product.images[0]}`}
                    alt={product.title}
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
                {product.stock === 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded shadow">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-2 text-sm">
                <h3 className="font-bold text-gray-900 text-base truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {truncate(product.description)}
                </p>
                <div className="font-semibold text-blue-600 text-md">
                  {product.price.toFixed(2)}
                </div>
                {product.tags && (
                  <div className="text-xs text-gray-500 mt-1 italic truncate">
                    {product.tags.join(", ")}
                  </div>
                )}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  disabled={addingToCart || product.stock === 0}
                  className={`w-full mt-3 py-2 px-4 rounded text-white font-medium transition-all duration-300 ${
                    product.stock === 0 || addingToCart
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
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

        {/* Modal already included below (unchanged) */}
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
            onClick={closeProductModal}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-black transition z-10"
                onClick={closeProductModal}
                aria-label="Close"
              >
                &times;
              </button>

              {/* Left: Product Image */}
              <div className="w-1/2 bg-gray-50 flex items-center justify-center p-6 border-r border-gray-200">
                <img
                  src={`http://localhost:5000/images/${selectedProduct.images?.[0]}`}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain rounded-xl shadow"
                />
              </div>

              {/* Right: Product Info */}
              <div className="w-1/2 p-8 overflow-y-auto text-gray-800 space-y-6">
                <h2 className="text-3xl font-bold">{selectedProduct.title}</h2>

                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {showFullDesc
                    ? selectedProduct.description
                    : truncate(selectedProduct.description, 160)}{" "}
                  {selectedProduct.description?.length > 160 && (
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="text-blue-600 hover:underline text-sm ml-1"
                    >
                      {showFullDesc ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>

                {/* Sizes, Price, Stock */}
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-semibold">Sizes:</span>{" "}
                    {selectedProduct.sizes?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span>{" "}
                    <span className="text-lg font-bold text-black">
                      {selectedProduct.price.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Stock:</span>{" "}
                    <span
                      className={`font-semibold ${
                        selectedProduct.stock === 0
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {selectedProduct.stock === 0
                        ? "Out of Stock"
                        : `${selectedProduct.stock} available`}
                    </span>
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 mt-4">
                  <label className="font-medium">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`mt-5 w-full py-3 px-4 rounded-xl text-white font-semibold transition duration-200 ${
                    selectedProduct.stock === 0 || addingToCart
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                  onClick={() => handleAddToCart(selectedProduct._id, quantity)}
                  disabled={addingToCart || selectedProduct.stock === 0}
                >
                  {selectedProduct.stock === 0
                    ? "Out of Stock"
                    : addingToCart
                    ? "Adding..."
                    : "Add to Cart"}
                </button>

                {/* Prev/Next Navigation */}
                <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
                  <button
                    className="hover:text-black transition font-medium"
                    onClick={prevProduct}
                  >
                    ← Previous
                  </button>
                  <button
                    className="hover:text-black transition font-medium"
                    onClick={nextProduct}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
