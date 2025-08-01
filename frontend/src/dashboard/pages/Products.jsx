import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(products);
    }
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const productList = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      const cleanedProducts = productList.map((p) => ({
        ...p,
        title: p.title || p.name || "Untitled",
        stock: typeof p.stock === "number" ? p.stock : 0,
        category: p.category || "-",
        price: typeof p.price === "number" ? p.price : 0,
      }));

      setProducts(cleanedProducts);
      setFiltered(cleanedProducts);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleEdit = (id) => navigate(`/edit-product/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
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

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Product Management</h2>
        <div className="actions">
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
                      className="edit-btn"
                      onClick={() => handleEdit(product._id)}
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon edit-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 15.25V18h2.75l8.071-8.071-2.75-2.75L2 15.25zM17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon delete-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
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
    </div>
  );
};

export default Products;
