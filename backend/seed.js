const mongoose = require('mongoose');
const Product = require('./models/productModel');
require('dotenv').config();

async function seedProducts() {
  try {
    console.log('Connecting to DB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB.');

    // Optional: Clear old products to avoid duplicates
    await Product.deleteMany();

    const products = [
      {
        name: "T-Shirt",
        price: 20,
        description: "Cool cotton t-shirt",
        sizes: ["S", "M", "L"],
        images: ["http://localhost:5000/images/Newhoodie.jpg"]
      },
      {
        name: "Jeans",
        price: 40,
        description: "Stylish denim jeans",
        sizes: ["M", "L", "XL"],
        images: ["http://localhost:5000/images/Allbottom.jpg"]
      },

      {
        name: "Sneakers",
        price: 60,
        description: "Comfortable sneakers",
        sizes: ["M", "L", "XL"],
        images: ["http://localhost:5000/images/sneak  ers.jpg"]
      }
    ];

    await Product.insertMany(products);
    console.log("Products added!");
  } catch (err) {
    console.error('Error seeding products:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from DB.');
  }
}

seedProducts();
