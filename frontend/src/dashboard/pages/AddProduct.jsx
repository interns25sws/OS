import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: 0,
    status: "active",
    images: [],
  });
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const fileArray = Array.from(files);
      const newImages = [...formData.images, ...fileArray];
      const newUrls = [...previewUrls, ...fileArray.map((f) => URL.createObjectURL(f))];

      // Reset input so same file can be selected again
      e.target.value = null;

      setFormData((prev) => ({ ...prev, images: newImages }));
      setPreviewUrls(newUrls);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    const updatedUrls = [...previewUrls];
    URL.revokeObjectURL(previewUrls[index]);
    updatedImages.splice(index, 1);
    updatedUrls.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setPreviewUrls(updatedUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, category, stock, status, images } = formData;

    if (!title || !description || !price || !category || images.length === 0) {
      alert("Please fill all required fields and upload at least one image.");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", title);
    submitData.append("description", description);
    submitData.append("price", parseFloat(price));
    submitData.append("category", category);
    submitData.append("stock", parseInt(stock));
    submitData.append("status", status);
    images.forEach((img) => submitData.append("images", img));

    try {
      setSubmitting(true);
      await axios.post("http://localhost:5000/api/products", submitData);
      alert("Product added successfully!");
      navigate("/dashboard/products");

      // Optional: clear form after success
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: 0,
        status: "active",
        images: [],
      });
      setPreviewUrls([]);
    } catch (err) {
      console.error("Submit Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <h2 style={titleStyle}>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <Field label="Title" name="title" value={formData.title} onChange={handleChange} required />
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
          label="Price"
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

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Product Images:</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            style={{ marginBottom: "10px" }}
          />
          <div style={imagePreviewContainer}>
            {previewUrls.map((url, idx) => (
              <div key={idx} style={imageBox}>
                <img src={url} alt={`preview-${idx}`} style={imageStyle} />
                <button type="button" style={removeBtnStyle} onClick={() => removeImage(idx)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

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

        <button
          type="submit"
          style={{ ...buttonStyle, opacity: submitting ? 0.6 : 1 }}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

const Field = ({ label, name, value, onChange, type = "text", rows = 1, required = false }) => (
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

// Styles (same as yours)
const wrapperStyle = {
  maxWidth: "720px",
  margin: "50px auto",
  padding: "40px",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#2c3e50",
};

const titleStyle = {
  textAlign: "center",
  color: "#2c3e50",
  fontSize: "28px",
  fontWeight: "600",
  marginBottom: "30px",
};

const labelStyle = {
  display: "block",
  fontWeight: "600",
  fontSize: "15px",
  marginBottom: "8px",
  color: "#34495e",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #dcdde1",
  fontSize: "15px",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#3498db",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const imagePreviewContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: "16px",
  marginTop: "16px",
};

const imageBox = {
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  border: "1px solid #ddd",
  backgroundColor: "#f8f8f8",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const removeBtnStyle = {
  position: "absolute",
  top: "6px",
  right: "6px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "22px",
  height: "22px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
};

export default AddProduct;
