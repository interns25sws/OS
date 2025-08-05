const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const dashboardRoutes = require("./routes/dashboard");
const connectDB = require('./config/db');

require('dotenv').config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.send('🚀 Server is up and running!'));
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('api/cart/checkout',cartRoutes)
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/customers", customerRoutes);


app.use('/images', express.static(path.join(__dirname, 'uploads')));



// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

module.exports = app;