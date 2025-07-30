// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// --- Schema definition ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  sizes: [String],
  images: [String],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

// --- Controllers merged inline ---
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== "All" ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, sizes, images } = req.body;
    const newProduct = new Product({ name, description, price, category, sizes, images });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ error: "Failed to create product" });
  }
});

module.exports = router;
