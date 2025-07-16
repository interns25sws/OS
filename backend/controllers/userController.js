const bcrypt = require("bcryptjs");
const User = require("../models/User");

// User Signup
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName)
    return res.status(400).json({ message: "All fields are required." });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: "Email already registered." });

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({ email, password: hashedPassword, firstName, lastName });
    await newUser.save();
    res.status(201).json({ message: "Signup successful! Please log in." });
  } catch (err) {
    res.status(500).json({ message: "Server error during signup." });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid email or password." });

  res.status(200).json({
    message: "Login successful! Welcome back.",
    firstName: user.firstName,
    lastName: user.lastName,
  });
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, "-password");
  res.status(200).json({ total: users.length, users });
};

// Update User 
exports.updateUser = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName },
      { new: true, select: "-password" }
    );
    if (!updated) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User updated successfully.", user: updated });
  } catch {
    res.status(500).json({ message: "Error updating user." });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User deleted successfully." });
  } catch {
    res.status(500).json({ message: "Error deleting user." });
  }
};
