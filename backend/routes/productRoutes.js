const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// GET /api/products?category=Shoes
router.get("/", async (req, res) => {
  try {
    console.log("Query received:", req.query);
    const { category } = req.query;
    const query = category && category !== "All" ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("Error in GET /api/products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products — to add a new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body; // Assuming these are the fields for a product
    const newProduct = new Product({ name, description, price, category, imageUrl });
    await newProduct.save(); // This saves the new product to the database
    res.status(201).json(newProduct); // Respond with the newly created product and a 201 Created status
  } catch (err) {
    console.error("Error in POST /api/products:", err);
    // Handle validation errors (e.g., if a required field is missing) or other database errors
    res.status(400).json({ error: "Failed to add product", details: err.message });
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
