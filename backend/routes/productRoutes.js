const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Product = require("../models/product.model");

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
  cb(null, file.originalname);
}
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max per file
});


// GET: List products with filter + pagination

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status } = req.query;
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      products,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST: Create a new product
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { title, description, price, category, status, stock } = req.body;
    const imageFiles = req.files;

    if (!title || !description || !price || !category || !status || stock == null || imageFiles.length === 0) {
      return res.status(400).json({ error: "All fields are required, including at least one image." });
    }

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    if (isNaN(parsedPrice) || parsedPrice < 1) {
      return res.status(400).json({ error: "Price must be at least 1 or Greater." });
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      return res.status(400).json({ error: "Stock must be a number and 0 or more." });
    }

    const imageNames = imageFiles.map((file) => file.filename);

    const newProduct = new Product({
      title,
      description,
      price: parsedPrice,
      category,
      status,
      stock: parsedStock,
      images: imageNames,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
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

// GET: Single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// PUT: Update product
router.put("/:id", async (req, res) => {
  try {
    const { title, description, price, category, status, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price, category, status, stock },
      { new: true }
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);

    // To also update images, use:
    /*
    router.put("/:id", upload.array("images", 5), async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });

      // Optionally delete old images
      product.images.forEach(img => fs.unlinkSync(path.join(uploadDir, img)));

      const newImages = req.files.map(file => file.filename);
      Object.assign(product, { title, description, price, category, status, stock, images: newImages });
      await product.save();
      res.json(product);
    });
    */
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE: Remove product + images
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete associated images
    product.images.forEach((img) => {
      const imgPath = path.join(uploadDir, img);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
