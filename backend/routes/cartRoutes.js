const express = require("express");
const mongoose = require("mongoose");
const { Types } = mongoose;
const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// ✅ Add or update item in cart
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = new Types.ObjectId(req.user._id);

  if (!productId || !quantity || isNaN(quantity) || quantity < 1) {
    return res.status(400).json({ error: "Invalid product ID or quantity" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
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
    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
    res.status(200).json({ message: "Item added to cart", cart: updatedCart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get user's cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});

// ✅ Remove product from cart
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const originalLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.status(200).json({ message: "Item removed", cart: updatedCart });
  } catch (err) {
    console.error("Remove item error:", err);
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});

// ✅ Update quantity of cart item
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

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
    res.status(200).json({ message: "Quantity updated", cart: updatedCart });
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ message: "Failed to update quantity", error: err.message });
  }
});

router.post("/checkout", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  const orderItems = cart.items.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
    price: item.productId.price,
  }));

  const total = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const newOrder = await Order.create({
    userId,
    items: orderItems,
    total,
    status: "placed",
  });

  await Cart.findOneAndDelete({ userId });

  res.json({ success: true, order: newOrder });
});

module.exports = router;
