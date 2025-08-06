const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    const names = categories.map((cat) => cat.name);
    res.json(names);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});


// Add new category
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name is required' });

  try {
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ error: 'Category already exists' });

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: 'Category created', name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// GET /api/products/category/:categoryName
router.get("/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;

  try {
    // Convert hyphens to spaces if your DB has categories like "summer wear"
    const formattedCategory = categoryName.replace(/-/g, " ");

    const products = await Product.find({
      category: { $regex: new RegExp("^" + formattedCategory + "$", "i") }, // case-insensitive match
    });

    res.json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// GET: Distinct categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});


module.exports = router;
