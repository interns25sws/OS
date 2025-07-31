const express = require("express");
const Cart = require("../models/cart.model.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// ✅ Add or update item
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity || isNaN(quantity) || quantity < 1) {
    return res.status(400).json({ message: "Invalid product ID or quantity" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      const parsedQty = parseInt(quantity);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += parsedQty;
      } else {
        cart.items.push({ productId, quantity: parsedQty });
      }

    }

    await cart.save();
    const populatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.status(200).json({ message: "Cart updated", cart: populatedCart });
  } catch (error) {
    console.error("Cart Add Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ Get user cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
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
    res.status(500).json({ message: "Failed to remove item", error: err });
  }
});

// ✅ Update item quantity (optional cleaner endpoint)
router.put("/update", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.productId.toString() === productId);

    if (item) {
      item.quantity = quantity;
      await cart.save();
      const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
      return res.status(200).json({ message: "Quantity updated", cart: updatedCart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update quantity", error: err });
  }
});

module.exports = router;
