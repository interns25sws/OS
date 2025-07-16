const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes'); //This is the file that contains the routes for the products
const userRoutes = require('./routes/userRoutes'); //This is the file that contains the routes for the users
const cartRoutes = require("./routes/cartRoutes"); //This is the file that contains the routes for the cart

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('🚀 Server is up and running!'));

// Use product routes for /api/products
app.use('/api/products', productRoutes);

// Use user routes for /api/users
app.use('/api/users', userRoutes);  

// Use cart routes for /api/cart
app.use("/api/cart", cartRoutes);

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
