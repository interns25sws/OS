const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
// const Order = require("../models/order.model");
// const Customer = require("../models/customer.model");

// GET summary counts
// routes/dashboard.js (Express)
router.get("/summary", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const customerCount = await User.countDocuments();
    const orderCount = await Order.countDocuments(); // optional

    res.json({
      products: productCount,
      customers: customerCount,
      orders: orderCount,
    });
  } catch (err) {
    console.error("Error fetching summary:", err);
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
});


module.exports = router;
