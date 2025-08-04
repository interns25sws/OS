const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
// const Order = require("../models/order.model");
// const Customer = require("../models/customer.model");

// GET summary counts
router.get("/summary", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const customerCount = await Customer.countDocuments();
    

    res.json({
      products: productCount,
      orders: orderCount,
      customers: customerCount,
    });
  } catch (err) {
    console.error("Error fetching summary:", err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

module.exports = router;
