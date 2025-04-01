const express = require('express');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose'); // Import mongoose for ObjectId validation
const config = require('../config'); // Import config
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Uploading file to 'uploads/' directory.`);
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log(`Saving file with original name: ${file.originalname}`);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Search route
router.get('/products/search', async (req, res) => {
    try {
        const { q } = req.query;
        console.log(`Received search query: ${q}`);

        // Use MongoDB's $text operator with your existing text index
        const products = await Product.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        )
        .sort({ score: { $meta: "textScore" } })
        .limit(10);

        console.log(`Found ${products.length} products matching the query.`);
        res.status(200).json({ products });
    } catch (error) {
        console.error('Search failed:', error.message);
        res.status(500).json({ message: 'Search failed' });
    }
});


// GET all products with pagination and filtering
router.get('/products', async (req, res) => {
  const { page = 1, limit = 100, category, subcategory } = req.query; // Set default limit to 100

  console.log(`Received request for page ${page}, category: ${category}, subcategory: ${subcategory}`);

  try {
    const query = {};
    if (category) query.Category = category;
    if (subcategory) query.SubCategory = subcategory;

    console.log('Query:', query);

    const count = await Product.countDocuments(query);
    console.log(`Total products matching the query: ${count}`);

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    console.log(`Fetched ${products.length} products for page ${page}`);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(`Fetching product with ID: ${productId}`);

    let product;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      console.log(`ID ${productId} is a valid ObjectId.`);
      product = await Product.findById(productId);
      console.log(`Querying by ObjectId: ${productId}`);
    } else {
      console.log(`ID ${productId} is not a valid ObjectId, searching by 'id' field.`);
      product = await Product.findOne({ id: productId });
      console.log(`Querying by 'id' field: ${productId}`);
    }

    if (product) {
      res.json(product);
      console.log('Product fetched successfully.');
    } else {
      res.status(404).json({ message: 'Product not found' });
      console.log('Product not found.');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// POST create new product
router.post('/products', async (req, res) => {
  try {
    console.log('Creating new product with data:', req.body);
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    console.log('Product created successfully.');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// PUT update product by ID
router.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(`Updating product with ID: ${productId}`);
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
      console.log('Product updated successfully.');
    } else {
      res.status(404).json({ message: 'Product not found' });
      console.log('Product not found.');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// DELETE product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(`Deleting product with ID: ${productId}`);
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.json({ message: 'Product deleted successfully' });
      console.log('Product deleted successfully.');
    } else {
      res.status(404).json({ message: 'Product not found' });
      console.log('Product not found.');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
