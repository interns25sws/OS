const mongoose = require("mongoose");
const Product = require("./models/productModel");
require("dotenv").config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();

    const products = [
      {
        name: "Classic White T-Shirt",
        price: 20,
        description: "Cool cotton T-shirt, perfect for summer.",
        category: "T-Shirt",
        sizes: ["S", "M", "L", "XL"],
        images: ["http://localhost:5000/images/10001.jpg"],
      },
      {
        name: "Denim Jeans",
        price: 40,
        description: "Slim-fit blue jeans for all-day comfort.",
        category: "Jeans",
        sizes: ["30", "32", "34", "36"],
        images: ["http://localhost:5000/images/10028.jpg"],
      },
      {
        name: "Slide Sandals",
        price: 25,
        description: "Easy-to-wear black slides for casual outings.",
        category: "Slides",
        sizes: ["7", "8", "9", "10"],
        images: ["http://localhost:5000/images/slides.jpg"],
      },
      {
        name: "Running Sneakers",
        price: 55,
        description: "Lightweight sneakers designed for running.",
        category: "Shoes",
        sizes: ["8", "9", "10", "11"],
        images: ["http://localhost:5000/images/sneakers.jpg"],
      },
      {
        name: "Cotton Shorts",
        price: 22,
        description: "Soft and breathable cotton shorts.",
        category: "Shorts",
        sizes: ["S", "M", "L", "XL"],
        images: ["http://localhost:5000/images/shorts.jpg"],
      },
      {
        name: "Formal Shirt",
        price: 30,
        description: "Perfect for office and formal occasions.",
        category: "Shirt",
        sizes: ["M", "L", "XL"],
        images: ["http://localhost:5000/images/formal.jpg"],
      },
    ];

    await Product.insertMany(products);
    console.log("✅ Products seeded!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();
