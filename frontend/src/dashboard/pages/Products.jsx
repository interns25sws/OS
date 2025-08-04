import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(products);
    } else {
      const term = searchTerm.toLowerCase();
      const filteredList = products.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p._id?.toLowerCase().includes(term)
      );
      setFiltered(filteredList);
    }
  }, [products, searchTerm]);

  const fetchProducts = async (page = 1, status = statusFilter) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?page=${page}&limit=10${
          status ? `&status=${status}` : ""
        }`
      );
      const productList = Array.isArray(res.data.products)
        ? res.data.products
        : [];

      const cleaned = productList.map((p) => ({
        ...p,
        title: p.title || p.name || "Untitled",
        stock: typeof p.stock === "number" ? p.stock : 0,
        category: p.category || "-",
        price: typeof p.price === "number" ? p.price : 0,
        status: p.status || "draft",
      }));

      setProducts(cleaned);
      setFiltered(cleaned);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.page || 1);
      setStatusFilter(status);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleEdit = (id) => navigate(`/edit-product/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        const updated = products.filter((p) => p._id !== id);
        setProducts(updated);
        setFiltered(updated);
        if (updated.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchProducts(currentPage);
        }
      } catch (err) {
        console.error("Failed to delete product", err);
      }
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-inter text-gray-800">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Product Management
        </h2>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name, ID, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-full sm:w-72 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              fetchProducts(1, e.target.value);
            }}
            className="px-4 py-2 w-full sm:w-auto text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-500 transition"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">Product ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filtered.length > 0 ? (
              filtered.map((product, index) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    PROD-{(index + 1).toString().padStart(3, "0")}
                  </td>
                  <td className="px-4 py-3">{product.title}</td>
                  <td className="px-4 py-3">₹{product.price}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {product.status === "active" ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(product._id)}
                        title="Edit"
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 italic text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 flex-wrap gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600 font-semibold"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Products;
