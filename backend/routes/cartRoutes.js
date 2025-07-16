const express = require("express");
const router = express.Router();
const CartItem = require("../models/Cart");

// POST /api/cart — add item to cart
router.post("/", async (req, res) => {
  try {
    console.log("Incoming cart request:", req.body); // ✅ log here

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: "Missing productId or quantity" });
    }

    const existingItem = await CartItem.findOne({ productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: "Cart item quantity updated" });
    }

    const cartItem = new CartItem({ productId, quantity });
    await cartItem.save();

    res.status(201).json({ message: "Product added to cart" });
  } catch (err) {
    console.error("❌ Error in /api/cart POST:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

module.exports = router;
