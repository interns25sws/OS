import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiImage,
  FiUploadCloud,
  FiBox,
  FiEdit3,
  FiHash,
  FiTrendingUp,
} from "react-icons/fi";

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
    sizes: [],
  });
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);
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
      const newUrls = [
        ...previewUrls,
        ...fileArray.map((f) => URL.createObjectURL(f)),
      ];
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
    const {
      title,
      description,
      price,
      category,
      stock,
      status,
      images,
      sizes,
    } = formData;

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
    sizes.forEach((size) => submitData.append("sizes[]", size));
    images.forEach((img) => submitData.append("images", img));

    try {
      setSubmitting(true);
      await axios.post("http://localhost:5000/api/products", submitData);
      alert("Product added successfully!");
      navigate("/dashboard/products");

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: 0,
        status: "active",
        images: [],
        sizes: [],
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
    <div className="max-w-7xl mx-auto mt-14 mb-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-10 ">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-12"
      >
        {/* Left Form */}
        <div className="flex-1 space-y-6">
          <Field
            icon={<FiEdit3 />}
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Field
            icon={<FiBox />}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            type="textarea"
            rows={4}
            required
          />
          <Field
            icon={<FiTrendingUp />}
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <Field
            icon={<FiHash />}
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          {/* Sizes */}
          <div>
            <label className="block font-semibold mb-2">Available Sizes</label>

            <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <label
                    key={size}
                    className={`px-4 py-2 border rounded-full text-sm cursor-pointer transition 
            ${
              formData.sizes.includes(size)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
                  >
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.sizes.includes(size)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          sizes: prev.sizes.includes(value)
                            ? prev.sizes.filter((s) => s !== value)
                            : [...prev.sizes, value],
                        }));
                      }}
                      className="hidden"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Shoe Sizes (Conditional) */}
          {formData.category.toLowerCase() === "shoes" && (
            <div>
              <label className="block font-semibold  mb-2">
                Shoe Sizes (EU)
              </label>

              <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {[6, 7, 8, 9, 10, 11, 12].map((size) => (
                    <label
                      key={size}
                      className={`px-4 py-2 border rounded-full text-sm cursor-pointer transition
              ${
                formData.sizes.includes(String(size))
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
                    >
                      <input
                        type="checkbox"
                        value={size}
                        checked={formData.sizes.includes(String(size))}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            sizes: prev.sizes.includes(value)
                              ? prev.sizes.filter((s) => s !== value)
                              : [...prev.sizes, value],
                          }));
                        }}
                        className="hidden"
                      />
                      EU {size}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side - Images & Status */}
        <div className="w-full lg:w-[40%] space-y-6">
          <div>
            <label className="block font-semibold mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FiUploadCloud className="text-lg " />
              Upload Product Images
            </label>

            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="block w-full text-sm text-gray-600
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
            />

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {previewUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300 bg-gray-100 shadow-sm"
                  >
                    <img
                      src={url}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 text-white font-bold rounded-md transition ${
              submitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Submitting..." : " Add Product"}
          </button>
        </div>
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
  icon,
}) => (
  <div>
    <label className="block font-semibold mb-2 flex items-center gap-2">
      {icon} {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="w-full border border-gray-300 px-4 py-2 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

export default AddProduct;
