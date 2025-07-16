const mongoose = require("mongoose");
const Product = require("./models/productModel"); // Make sure this path matches your file
require("dotenv").config();

async function seedProducts() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB.");

    await Product.deleteMany();
    console.log("Existing products deleted.");

    const products = [
      {
        name: "T-Shirt",
        price: 20,
        description: "Cool cotton t-shirt",
        category: "Clothing",           // Added category here
        sizes: ["S", "M", "L"],
        images: ["http://localhost:5000/images/Newhoodie.jpg"],
      },
      {
        name: "Sneakers",
        price: 50,
        description: "Comfortable running shoes",
        category: "Shoes",
        sizes: ["8", "9", "10"],
        images: ["http://localhost:5000/images/sneakers.jpg"],
      },
    ];

    await Product.insertMany(products);
    console.log("Products added!");
  } catch (err) {
    console.error("Error seeding products:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from DB.");
  }
}

seedProducts();
