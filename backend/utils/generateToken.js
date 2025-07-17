const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "";

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;

