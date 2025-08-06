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
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  cb(null, allowedTypes.includes(file.mimetype));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max per file
});


router.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;

    const products = await Product.aggregate([{ $sample: { size: limit } }]);

    // Optional: prevent caching on the response
    res.set('Cache-Control', 'no-store');

    res.json({ products }); // Important: Wrap in an object to match your frontend code
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server Error" });
  }
});



// GET: List products with filter + pagination

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = null, category, status } = req.query;
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

    // ✅ Get sizes from FormData (can be string or array)
    let sizes = req.body["sizes[]"] || [];
    if (typeof sizes === "string") {
      sizes = [sizes];
    }

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !status ||
      stock == null ||
      imageFiles.length === 0
    ) {
      return res.status(400).json({
        error: "All fields are required, including at least one image.",
      });
    }

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    if (isNaN(parsedPrice) || parsedPrice < 1) {
      return res
        .status(400)
        .json({ error: "Price must be at least 1 or Greater." });
    }

    if (isNaN(parsedStock) || parsedStock < 0) {
      return res
        .status(400)
        .json({ error: "Stock must be a number and 0 or more." });
    }

    const imageNames = imageFiles.map((file) => file.filename);

    const newProduct = new Product({
      title,
      description,
      price: parsedPrice,
      category,
      status,
      stock: parsedStock,
      sizes, // ✅ Added sizes field
      images: imageNames,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});


// GET only active products (for main website)
router.get("/active", async (req, res) => {
  const category = req.query.category;

  const filter = { status: "active" };
  if (category) filter.category = category;

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
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
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });


    const imageFiles = req.files;

    // Normalize retained images
    const retained = req.body["retainedImages[]"];
    const retainedArrayRaw = typeof retained === "string" ? [retained] : retained || [];
    const retainedArray = retainedArrayRaw.map((imgUrl) =>
      path.basename(imgUrl)
    );


    let finalImages;
    if (retainedArray.length === 0 && imageFiles.length === 0) {
      finalImages = product.images; // ✅ Keep old images
    } else {
      //  Delete removed images from server
      product.images.forEach((img) => {
        if (!retainedArray.includes(img)) {
          const imgPath = path.join(uploadDir, img);
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }
      });

      // ✅ Add new image filenames
      const newImages = imageFiles.map((file) => file.filename);
      finalImages = [...retainedArray, ...newImages];
    }

    // Sizes normalization
    const sizes = req.body["sizes[]"];
    const sizesArray = Array.isArray(sizes) ? sizes : sizes ? [sizes] : [];

    // Other fields
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.category = req.body.category;
    product.status = req.body.status; // ✅ <-- this was missing before
    product.sizes = sizesArray;
    product.images = finalImages; // ✅ ADD THIS LINE


    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Server error" });
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
