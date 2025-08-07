const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

// ✅ Get all category names
router.get('/', async (req, res) => {
  
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories.map(c => c.name));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// ✅ Add a new category
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

module.exports = router;
