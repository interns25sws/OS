const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log("Received:", { userId, productId, quantity });

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "Missing userId, productId, or quantity" });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        item => item.productId && item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
      return res.json({ message: "Cart updated successfully", cart });
    } else {
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });

      await newCart.save();
      return res.status(201).json({ message: "Cart created successfully", cart: newCart });
    }
  } catch (error) {
    console.error("❌ Error in /api/cart POST:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
