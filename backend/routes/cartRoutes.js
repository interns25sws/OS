const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/productModel");

// POST /api/cart/:userId — add item to cart
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: "Missing productId or quantity" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Update existing cart
      const existingItem = cart.items.find((item) => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// GET /api/cart/:userId — fetch cart with product details
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.json({ items: [] });

    const detailedItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      image: item.productId.images?.[0],
      quantity: item.quantity,
    }));

    res.json({ items: detailedItems });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// DELETE /api/cart/:userId/:productId — remove item
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

module.exports = router;
