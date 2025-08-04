const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  stock: { type: Number, default: 0 },
  images: [String]
}, { timestamps: true }); // This adds createdAt and updatedAt

module.exports = mongoose.model("Product", productSchema);
