const express = require("express");
const router = express.Router();
const {
  getProducts,
  getCategories,
  createProduct
} = require("../controllers/productController");

// GET /api/products?category=Shoes
router.get("/", getProducts);

// GET /api/products/categories
router.get("/categories", getCategories);

// POST /api/products (for admin use)
router.post("/", createProduct);

module.exports = router;
