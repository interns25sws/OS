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
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/categories — to get list of categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;
