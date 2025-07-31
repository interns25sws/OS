const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"] },
  role: {
    type: String,
    enum: ["user", "sales-rep", "admin", "super-admin"],
    default: "user"
  },
});

module.exports = mongoose.model("User", userSchema);
