const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

// ✅ Protect these routes
router.get("/", authMiddleware, userController.getAllUsers);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
