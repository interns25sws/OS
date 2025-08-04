import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(products);
    } else {
      const filteredList = products.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(filteredList);
    }
  }, [products, searchTerm]);

  const fetchProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?page=${page}&limit=10`
      );
      const productList = Array.isArray(res.data.products)
        ? res.data.products
        : [];

      const cleanedProducts = productList.map((p) => ({
        ...p,
        title: p.title || p.name || "Untitled",
        stock: typeof p.stock === "number" ? p.stock : 0,
        category: p.category || "-",
        price: typeof p.price === "number" ? p.price : 0,
      }));

      setProducts(cleanedProducts);
      setFiltered(cleanedProducts);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.page || 1);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleEdit = (id) => navigate(`/edit-product/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        const updatedProducts = products.filter((p) => p._id !== id);
        setProducts(updatedProducts);
        setFiltered(updatedProducts);
        if (updatedProducts.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchProducts(currentPage);
        }
      } catch (err) {
        console.error("Failed to delete product", err);
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredList = products.filter(
      (p) =>
        p.title?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p._id?.toLowerCase().includes(term)
    );
    setFiltered(filteredList);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Product Management</h2>
        <div className="actions-products">
          <input
            type="text"
            placeholder="Search by name, ID, category..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="add-btn" onClick={() => navigate("/add-product")}>
            + Add Product
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        product.stock > 0 ? "active" : "inactive"
                      }`}
                    >
                      {product.stock > 0 ? "Active" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="edit-button-table">
                    <button
                      className="edit-btn-table"
                      onClick={() => handleEdit(product._id)}
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      className="delete-btn-table"
                      onClick={() => handleDelete(product._id)}
                      title="Delete"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          ← Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`pagination-page ${
                currentPage === page ? "active" : ""
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Products;
