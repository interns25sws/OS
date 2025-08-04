const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  status: { type: String, enum: ["active", "draft"], default: "active" },
  stock: { type: Number, default: 0 },
  sizes: {
    type: [String],
    required: true,
  },

  images: [String]
}, { timestamps: true }); // This adds createdAt and updatedAt

module.exports = mongoose.model("Product", productSchema);
