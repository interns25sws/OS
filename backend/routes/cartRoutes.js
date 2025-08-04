const express = require("express");
const mongoose = require("mongoose");
const { Types } = mongoose; // ✅ Fix: import Types
const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// ✅ Add or update item in cart
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = new Types.ObjectId(req.user._id); // enforce correct ObjectId

  console.log("Add to cart request:", { userId, productId, quantity });

  if (!productId || !quantity || isNaN(quantity) || quantity < 1) {
    return res.status(400).json({ error: "Invalid product ID or quantity" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId, // use directly
        items: [{ productId: new Types.ObjectId(productId), quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId: new Types.ObjectId(productId),
          quantity,
        });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ✅ Get cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

// ✅ Remove item from cart
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.status(200).json({ message: "Item removed", cart: updatedCart });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});

// ✅ Update item quantity
router.put("/update", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || isNaN(quantity) || quantity < 1) {
    return res.status(400).json({ error: "Invalid product ID or quantity" });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
      await cart.save();
      const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
      return res.status(200).json({ message: "Quantity updated", cart: updatedCart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update quantity", error: err.message });
  }
});

module.exports = router;
