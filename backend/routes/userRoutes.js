const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user.model");
const authMiddleware = require("../middleware/authMiddleware");
const generateToken = require("../utils/generateToken");

const JWT_SECRET = process.env.JWT_SECRET || "replace_this_with_env_secret";
const SALT_ROUNDS = 10;



const allowRoles = ["admin", "super-admin", "sales-rep"];

router.get("/admin-panel", authMiddleware, (req, res) => {
  if (!allowRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json({ message: `Welcome to the admin panel, ${req.user.role}` });
});

module.exports = router;

// Signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// Get All Users (Protected)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({ total: users.length, users });
  } catch (err) {
    console.error("GetAllUsers error:", err);
    res.status(500).json({ message: "Error fetching users." });
  }
});

// Update User (Protected)
router.put("/:id", authMiddleware, async (req, res) => {
  const { firstName, lastName, phone, dob, gender } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, phone, dob, gender },
      { new: true, select: "-password" }
    );
    if (!updated) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User updated successfully.", user: updated });
  } catch (err) {
    console.error("UpdateUser error:", err);
    res.status(500).json({ message: "Error updating user." });
  }
});

// Delete User (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("DeleteUser error:", err);
    res.status(500).json({ message: "Error deleting user." });
  }
});

module.exports = router;
