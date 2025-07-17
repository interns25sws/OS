const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// GET /api/products?category=Shoes
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

// GET all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST /api/products (optional: for admin use)
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
