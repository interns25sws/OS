const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { connectDB, User } = require("./mongo"); // Your MongoDB connection and User model

const app = express();

// Enable CORS for cross-origin requests (important if frontend runs on different domain/port)
app.use(cors());

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Connect to MongoDB database (runs once when server starts)
connectDB();

// Root route to check if server is up
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running with MongoDB!");
});

/**
 * Signup Route
 * Registers a new user after validating input and hashing password.
 */
app.post("/api/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validate that all required fields are present
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if user with given email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered." });
  }

  try {
    // Hash the password securely before saving
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create new user document
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Save user to MongoDB
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "Signup successful! Please log in." });
  } catch (error) {
    // Handle unexpected errors during signup
    res.status(500).json({ message: "Server error during signup." });
  }
});

/**
 * Login Route
 * Authenticates user by checking email and password.
 */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    // If no user found, send unauthorized
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // Compare entered password with hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // Password mismatch
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // Login successful — respond with user info (exclude password)
  res.status(200).json({
    message: "Login successful! Welcome back.",
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

/**
 * Update User Info
 * Updates firstName and lastName of the user by ID.
 */
app.put("/api/users/:id", async (req, res) => {
  const { firstName, lastName } = req.body;
  const { id } = req.params;

  try {
    // Find user by ID and update specified fields, exclude password in result
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      // If user not found, send 404
      return res.status(404).json({ message: "User not found." });
    }

    // Success: send updated user data
    res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    // Handle server error
    res.status(500).json({ message: "Error updating user." });
  }
});

/**
 * Delete User
 * Deletes a user by ID.
 */
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      // User not found response
      return res.status(404).json({ message: "User not found." });
    }

    // Successful deletion response
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    // Server error
    res.status(500).json({ message: "Error deleting user." });
  }
});

/**
 * Get All Users
 * Retrieves all users excluding their passwords.
 */
app.get("/api/users", async (req, res) => {
  // Fetch all users, exclude passwords for security
  const users = await User.find({}, "-password");
  res.status(200).json({
    total: users.length,
    users,
  });
});

// Start server on specified port (default 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
