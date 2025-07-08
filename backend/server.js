import fs from "fs";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
  
const USERS_FILE = "./users.json";

// Load users from file on startup
let users = new Map();
try {
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  const obj = JSON.parse(data);
  users = new Map(Object.entries(obj));
  console.log("Loaded users from file.");
} catch (error) {
  console.log("No users file found, starting fresh.");
}

// Helper to save users to file
function saveUsers() {
  const obj = Object.fromEntries(users);
  fs.writeFileSync(USERS_FILE, JSON.stringify(obj, null, 2));
}

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid input!" });
  }
  if (users.has(email)) {
    return res.status(409).json({ message: "Email already registered." });
  }
  users.set(email, password);
  saveUsers();  // Save to file after registering new user
  res.json({ message: "Sign up successful! Please log in." });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!users.has(email) || users.get(email) !== password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }
  res.json({ message: "Login successful! Welcome back." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
