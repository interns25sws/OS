const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.get("/", authMiddleware, cartController.getCartByTokenUser);
router.post("/add", authMiddleware, cartController.addOrUpdateCart);

// Optional: clear cart by userId (admin or dev route)
router.delete("/:userId", cartController.clearCart);

module.exports = router;
