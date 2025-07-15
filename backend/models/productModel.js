const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  sizes: [String],
  images: [String],
});

module.exports = mongoose.model('Product', productSchema);
