const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

// Load users from file on startup
let users = new Map();
try {
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  const parsed = JSON.parse(data);
  users = new Map(Object.entries(parsed));
  console.log("✅ Loaded users from file.");
} catch (error) {
  console.log("⚠️ No users file found, starting fresh.");
}

// Helper to save users to file
function saveUsers() {
  const obj = Object.fromEntries(users);
  fs.writeFileSync(USERS_FILE, JSON.stringify(obj, null, 2));
}

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

// Signup route
app.post("/api/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (users.has(email)) {
    return res.status(409).json({ message: "Email already registered." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.set(email, { password: hashedPassword, firstName, lastName });
    saveUsers();
    return res.status(201).json({ message: "Signup successful! Please log in." });
  } catch (error) {
    return res.status(500).json({ message: "Server error during signup." });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = users.get(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  return res.status(200).json({
    message: "Login successful! Welcome back.",
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

// New route: Get all users (excluding passwords)
app.get("/api/users", (req, res) => {
  const allUsers = Array.from(users.entries()).map(([email, user]) => ({
    email,
    firstName: user.firstName,
    lastName: user.lastName,
  }));

  res.status(200).json({
    total: allUsers.length,
    users: allUsers,
  });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
