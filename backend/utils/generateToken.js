const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role || "user" },
    process.env.JWT_SECRET || "replace_this_with_env_secret",
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
