const mongoose = require("mongoose");
const Product = require("./models/productModel");
require("dotenv").config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();

    const products = [
      {
        name: "T-Shirt",
        price: 20,
        description: "Cool cotton t-shirt",
        category: "Clothing",
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
    console.log("✅ Products seeded!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();
