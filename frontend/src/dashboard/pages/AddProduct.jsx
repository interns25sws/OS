import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: 0,
    status: "active",
    images: [],
  });

  const [previewUrls, setPreviewUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/categories"
        );
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const fileArray = Array.from(files);
      setFormData((prev) => ({ ...prev, images: fileArray }));

      // Generate preview URLs
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, category, stock, status, images } =
      formData;

    if (!name || !description || !price || !category || images.length === 0) {
      alert("Please fill all required fields including images.");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", name);
    submitData.append("description", description);
    submitData.append("price", Number(price));
    submitData.append("category", category);
    submitData.append("stock", Number(stock));
    submitData.append("status", status);

    images.forEach((img) => submitData.append("images", img)); // Append all files

    try {
      await axios.post("http://localhost:5000/api/products", submitData);
      alert("Product added successfully!");
      navigate("/dashboard/products");
    } catch (err) {
      console.error("Submit Error:", err.response?.data || err.message);
      alert("Failed to add product");
    }
  };

  return (
    <div style={wrapperStyle}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "25px" }}>
        Add New Product
      </h2>
      <form onSubmit={handleSubmit}>
        <Field
          label="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Field
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          type="textarea"
          rows={4}
        />
        <Field
          label="Price (₹)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <Field
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        {/* Category Dropdown */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Multi-Image Upload */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Product Images:</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
          {previewUrls.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              {previewUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`preview-${idx}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>
          Add Product
        </button>
      </form>
    </div>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  rows = 1,
  required = false,
}) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={labelStyle}>{label}:</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        style={{ ...inputStyle, resize: "vertical" }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
      />
    )}
  </div>
);

const wrapperStyle = {
  maxWidth: "600px",
  margin: "50px auto",
  padding: "30px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "6px",
  color: "#444",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

export default AddProduct;
