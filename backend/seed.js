const mongoose = require("mongoose");
const Product = require("./models/productModel");
require("dotenv").config();

async function seedProducts() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB.");

    await Product.deleteMany();

    const products = [
      {
        name: "T-Shirt",
        price: 20,
        description: "Cool cotton t-shirt",
        sizes: ["S", "M", "L"],
        images: ["http://localhost:5000/images/Newhoodie.jpg"],
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
