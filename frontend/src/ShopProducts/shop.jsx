import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const getToken = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    return loggedInUser?.token || "";
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data]))
      .catch(() => setCategories(["All"]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");

    const url =
      selectedCategory && selectedCategory !== "All"
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
        setAllProducts(productList);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleAddToCart = (productId, qty = 1) => {
    setAddingToCartId(productId);

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
        setAddingToCartId(null);
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f0f4f8,_#dbeafe)] bg-fixed">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Explore Our Products
        </h1>

        {/* Filter + Search + Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-400"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <AiOutlineSearch className="text-gray-500 text-xl" />
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => {
                const keyword = e.target.value.toLowerCase();
                const filtered = allProducts.filter((p) =>
                  p.title.toLowerCase().includes(keyword)
                );
                setProducts(filtered);
              }}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64 text-sm shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <select
            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              const sort = e.target.value;
              const sorted = [...products];
              if (sort === "asc") sorted.sort((a, b) => a.price - b.price);
              else if (sort === "desc")
                sorted.sort((a, b) => b.price - a.price);
              setProducts(sorted);
            }}
          >
            <option value="">Sort by</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>

        {/* Toast */}
        {cartMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50">
            {cartMessage}
          </div>
        )}

        {/* Error */}
        {error && <div className="text-center text-red-600">{error}</div>}

        {/* Loader */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/60 p-4 rounded-lg shadow"
              >
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-100"
              >
                <FaHeart className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition cursor-pointer z-10" />
                <div
                  className="relative h-[300px] cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  {product.images?.[0] ? (
                    <img
                      src={`http://localhost:5000/images/${product.images[0]}`}
                      alt={product.title}
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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

                <div className="p-4 space-y-2 text-sm">
                  <h3 className="font-bold text-gray-900 text-base truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {truncate(product.description)}
                  </p>
                  <div className="font-semibold text-blue-600">
                    ₹{product.price.toFixed(2)}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={
                      addingToCartId === product._id || product.stock === 0
                    }
                    className={`w-full mt-3 py-2 px-4 rounded text-white font-medium transition-all duration-300 ${
                      product.stock === 0 || addingToCartId === product._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : addingToCartId === product._id
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
            onClick={closeProductModal}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-black transition z-10"
                onClick={closeProductModal}
              >
                &times;
              </button>

              <div className="w-1/2 bg-gray-50 flex items-center justify-center p-6 border-r border-gray-200">
                <img
                  src={`http://localhost:5000/images/${selectedProduct.images?.[0]}`}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain rounded-xl shadow"
                />
              </div>

              <div className="w-1/2 p-8 overflow-y-auto text-gray-800 space-y-6">
                <h2 className="text-3xl font-bold">{selectedProduct.title}</h2>
                <p className="text-sm text-gray-700">
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

                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-semibold">Sizes:</span>{" "}
                    {selectedProduct.sizes?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span>{" "}
                    <span className="text-lg font-bold text-black">
                      ₹{selectedProduct.price.toFixed(2)}
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

                <div className="flex items-center gap-3 mt-4">
                  <label className="font-medium">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  className={`mt-5 w-full py-3 px-4 rounded-xl text-white font-semibold transition duration-200 ${
                    selectedProduct.stock === 0 ||
                    addingToCartId === selectedProduct._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                  onClick={() => handleAddToCart(selectedProduct._id, quantity)}
                  disabled={
                    addingToCartId === selectedProduct._id ||
                    selectedProduct.stock === 0
                  }
                >
                  {selectedProduct.stock === 0
                    ? "Out of Stock"
                    : addingToCartId === selectedProduct._id
                    ? "Adding..."
                    : "Add to Cart"}
                </button>

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
