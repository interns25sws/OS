const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { connectDB, User } = require("./mongo");


const app = express();
app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running with MongoDB!");
});


// Signup route
app.post("/api/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({ email, password: hashedPassword, firstName, lastName });
    await newUser.save();
    res.status(201).json({ message: "Signup successful! Please log in." });
  } catch (error) {
    res.status(500).json({ message: "Server error during signup." });
  }
});


// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.status(200).json({
    message: "Login successful! Welcome back.",
    firstName: user.firstName,
    lastName: user.lastName,
  });
});


// Update user info
app.put("/api/users/:id", async (req, res) => {
  const { firstName, lastName } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true, select: "-password" } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user." });
  }
});


// Delete user
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user." });
  }
});


// Get all users (without passwords)
app.get("/api/users", async (req, res) => {
  const users = await User.find({}, "-password"); 
  res.status(200).json({
    total: users.length,
    users,
  });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
