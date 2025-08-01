const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: [1, "Price must be greater than 1"] },
  category: { type: String, required: true },
  stock: { type: Number, default: 0, required: true },
  sizes: [String],
  images: [String],
  status: {
    type: String,
    enum: ["active", "draft"],
    default: "active",
  },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
