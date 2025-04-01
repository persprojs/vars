const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGO_URI = 'mongodb://localhost:27017/ecommerce'; // Hardcoded MongoDB URI

async function updateProductIds() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const products = await Product.find();
    for (const product of products) {
      if (!product.id) {
        product.id = product._id.toString(); // Set the id field to the string representation of _id
        await product.save();
      }
    }

    console.log('Product IDs updated successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating product IDs:', error);
    mongoose.disconnect();
  }
}

updateProductIds();