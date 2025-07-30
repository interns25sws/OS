const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user.model");
const authMiddleware = require("../middleware/authMiddleware");
const generateToken = require("../utils/generateToken");

const JWT_SECRET = process.env.JWT_SECRET || "replace_this_with_env_secret";
const SALT_ROUNDS = 10;

// Signup
router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName, phone, dob, gender } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      dob,
      gender,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful. Please login." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials." });

  const token = generateToken(user);

  res.status(200).json({
    message: "Login successful.",
    token,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  });
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
