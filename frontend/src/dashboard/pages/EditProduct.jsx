import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [existingImages, setExistingImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, prodRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products/categories"),
          axios.get(`http://localhost:5000/api/products/${id}`),
        ]);
        setCategories(catsRes.data);
        const p = prodRes.data;
        setFormData({
          title: p.title || "",
          description: p.description || "",
          price: p.price || "",
          category: p.category || "",
          stock: p.stock || 0,
          status: p.status || "draft",
          sizes: p.sizes || [],
          images: [],
        });
        setExistingImages(p.images || []);
      } catch (err) {
        console.error("Loading error", err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    return () => previewUrls.forEach(URL.revokeObjectURL);
  }, [previewUrls]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const filesArr = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesArr],
      }));
      setPreviewUrls((prev) => [
        ...prev,
        ...filesArr.map((f) => URL.createObjectURL(f)),
      ]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const removeNewImage = (idx) => {
    const updatedImgs = [...formData.images];
    const updatedPreviews = [...previewUrls];
    URL.revokeObjectURL(previewUrls[idx]);
    updatedImgs.splice(idx, 1);
    updatedPreviews.splice(idx, 1);
    setFormData((prev) => ({ ...prev, images: updatedImgs }));
    setPreviewUrls(updatedPreviews);
  };

  const removeExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((u) => u !== url));
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
    if (!title || !description || !price || !category) {
      alert("Please fill all required fields.");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("price", parseFloat(price));
    fd.append("category", category);
    fd.append("stock", parseInt(stock));
    fd.append("status", status);
    sizes.forEach((sizes) => fd.append("sizes[]", sizes));
    existingImages.forEach((img) => fd.append("retainedImages[]", img));
    images.forEach((img) => fd.append("images", img));

    try {
      setSubmitting(true);
      await axios.put(`http://localhost:5000/api/products/${id}`, fd);
      alert("Product updated!");
      navigate("/dashboard/products");
    } catch (err) {
      console.error("Update error", err);
      alert(err?.response?.data?.error || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-14 mb-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8">✏️ Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {/* Left section */}
        <div className="md:col-span-2 space-y-6">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            label="Price (₹)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <Input
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          {/* Size selection */}
          <SizeSelector
            title="Available Sizes"
            sizes={["XS", "S", "M", "L", "XL", "XXL"]}
            selected={formData.sizes}
            onToggle={toggleSize}
          />

          {/* Shoe Sizes if applicable */}
          {formData.category?.toLowerCase() === "shoes" && (
            <SizeSelector
              title="Shoe Sizes (EU)"
              sizes={[6, 7, 8, 9, 10, 11, 12].map(String)}
              selected={formData.sizes}
              onToggle={toggleSize}
              labelPrefix="EU "
            />
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300"
              required
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Right image section */}
        <div className="space-y-6">
          {/* Existing Images */}
          {existingImages.length > 0 && (
            <ImageGrid
              title="Existing Images"
              images={existingImages}
              onRemove={(url) => removeExistingImage(url)}
              isPreview={false}
            />
          )}

          {/* Upload new images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiUploadCloud className="text-lg text-indigo-600" />
              Upload New Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="block w-full text-sm text-gray-600
                         file:mr-4 file:py-2 file:px-4 file:rounded-md
                         file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {previewUrls.length > 0 && (
              <ImageGrid
                title="New Images"
                images={previewUrls}
                onRemove={(idx) => removeNewImage(idx)}
                isPreview={true}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 text-white font-bold rounded-md transition ${
              submitting
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {submitting ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Input Component
const Input = ({ label, name, value, onChange, type = "text", required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300"
    />
  </div>
);

// Textarea Component
const Textarea = ({ label, name, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      required={required}
      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 resize-y"
    />
  </div>
);

// SizeSelector Component
const SizeSelector = ({
  title,
  sizes,
  selected,
  onToggle,
  labelPrefix = "",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {title}
    </label>
    <div className="flex flex-wrap gap-2">
      {sizes.map((sz) => (
        <label
          key={sz}
          className={`px-4 py-2 border rounded-full text-sm cursor-pointer ${
            selected.includes(sz)
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => onToggle(sz)}
        >
          {labelPrefix}
          {sz}
        </label>
      ))}
    </div>
  </div>
);

// ImageGrid Component
const ImageGrid = ({ title, images, onRemove, isPreview }) => (
  <div>
    {title && <label className="block font-semibold mb-2">{title}</label>}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {images.map((url, i) => (
        <div
          key={i}
          className="relative aspect-square rounded-lg overflow-hidden border bg-gray-100"
        >
          <img
            src={url}
            alt={`preview-${i}`}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => (isPreview ? onRemove(i) : onRemove(url))}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default EditProduct;
