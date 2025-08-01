const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "")}`),
});
const upload = multer({ storage });

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true },
    sizes: [String],
    images: [String],
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

// GET all products with stock info
router.get("/", async (req, res) => {
  try {
    const { category, status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (status && status !== "All") filter.status = status;

    const parsedLimit = parseInt(limit);
    const skip = (parseInt(page) - 1) * parsedLimit;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    const enrichedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      sizes: product.sizes,
      images: product.images,
      status: product.status,
      stock: product.stock,
      stockStatus: product.stock > 0 ? "In Stock" : "Out of Stock",
    }));

    res.json({
      products: enrichedProducts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / parsedLimit),
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST create new product
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { name, description, price, category, sizes, status, stock } = req.body;
    const imageFiles = req.files;

    if (!name || !price || !category || !status || stock == null || imageFiles.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const images = imageFiles.map((file) => file.filename);

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      sizes: sizes ? sizes.split(",").map((s) => s.trim()) : [],
      images,
      status,
      stock: Number(stock),
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});


// GET distinct categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST new category (optional route)
router.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Category name is required" });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(409).json({ error: "Category already exists" });

    const newCat = new Category({ name });
    await newCat.save();

    res.status(201).json({ message: "Category added", category: newCat });
  } catch (err) {
    console.error("Add Category Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});


// DELETE product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT (EDIT) product by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
