const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  sizes: [String],
  images: [String],
}, { timestamps: true });

// Fix: Check if already compiled
module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
