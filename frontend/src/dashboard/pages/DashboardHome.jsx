// ✅ All imports stay the same
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const getImageUrl = (product) => {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return `http://localhost:5000/images/${product.images[0]}`;
  }
  const img = product.image || product.imageUrl;
  if (!img) return "/images/no-image.png";
  if (img.startsWith("http")) return img;
  return `http://localhost:5000/${img}`;
};

const DashboardHome = () => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          "http://localhost:5000/api/products",
          config
        );

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isHomePage) {
      fetchProducts();
    }
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black bg-opacity-40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-0`}
      >
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 w-full h-full">
        <Topbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 bg-gray-100">
          {isHomePage && (
            <>
              <section className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome Back 👋
                </h1>
                <p className="text-gray-600 mt-1 text-sm">
                  Here's what's happening in your store today.
                </p>
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left: Summary */}
                <div className="col-span-1">
                  {loading ? (
                    <div className="text-center text-gray-500 animate-pulse">
                      Loading summary...
                    </div>
                  ) : (
                    <SummaryCard
                      title="Total Products"
                      value={products.length}
                    />
                  )}
                </div>

                {/* Right: Product List */}
                <section className="col-span-2 bg-white p-5 rounded-xl shadow border border-gray-200 max-h-[500px] overflow-y-auto">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    All Products
                  </h2>

                  {loading ? (
                    <p className="text-gray-500">Loading products...</p>
                  ) : products.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                  ) : (
                    <div className="space-y-3">
                      {products.map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                      ))}
                    </div>
                  )}
                </section>
              </section>
            </>
          )}

          <div className={isHomePage ? "mt-8" : ""}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

// ✅ Summary Card
const SummaryCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
    <h3 className="text-4xl font-extrabold text-blue-600">{value}</h3>
    <p className="text-sm text-gray-600 mt-2 font-medium">{title}</p>
  </div>
);

// ✅ Product Card
const ProductCard = ({ product }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border hover:shadow transition duration-200">
    {/* Product Image */}
    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-white border border-gray-300">
      <img
        src={getImageUrl(product)}
        alt={product.title || "Product Image"}
        className="w-full h-full object-cover"
        onError={(e) => (e.target.src = "/images/no-image.png")}
      />
    </div>

    {/* Product Info */}
    <div className="flex-1 min-w-0">
      <h4 className="text-md font-semibold text-gray-800 truncate">
        {product.title || "Untitled Product"}
      </h4>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {product.description || "No description available."}
      </p>
      <p className="text-sm text-gray-700 font-medium mt-2">
        Price: ₹{product.price || "N/A"}
      </p>
    </div>
  </div>
);

export default DashboardHome;
