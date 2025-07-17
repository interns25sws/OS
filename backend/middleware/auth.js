const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "replace_this_with_env_secret";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expect Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contains userId, or any payload from login/signup
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
