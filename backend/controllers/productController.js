const Product = require("../models/product.model");

// @desc    Get all products or filter by category
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== "All" ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// @desc    Get unique categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// @desc    Create a new product (Admin use)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, images } = req.body;
    const newProduct = new Product({ name, description, price, category, sizes, images });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ error: "Failed to create product" });
  }
};
