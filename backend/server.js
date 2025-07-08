import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = new Map(); 

app.get("/", (req, res) => {
  res.send(" Server is up and running!");
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
  console.log("Registered users:", users);
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
  console.log(` Server running at http://localhost:${PORT}`);
});
