//adding a comment to trigger a build
// backend/models/Product.js (MINIMAL UPDATE VERSION)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Price: { type: Number, required: true },
  Images: { type: String, required: true },
  Variant1: { type: String },
  Variant2: { type: String },
  Variant3: { type: String },
  Category: { type: String, required: true },
  SubCategory: { type: String, required: true },
  Tags: { type: String },
});

// 1. Keep your existing compound index (perfect for filtering)
productSchema.index({ Category: 1, SubCategory: 1 });

// 2. ENHANCED text index (adds Category/SubCategory for better predictive results)
productSchema.index({
  Title: 'text',
  Description: 'text',
  Category: 'text',    // Added for predictive dropdown
  SubCategory: 'text'  // Added for predictive dropdown
}, {
  name: "SearchIndex",
  weights: {
    Title: 10,       // Highest priority (matches your <mark> highlighting)
    Category: 5,     // Medium priority
    SubCategory: 3,  // Lower priority
    Description: 1   // Baseline
  }
});

// 3. Keep your price index (essential for sorting)
productSchema.index({ Price: 1 });

module.exports = mongoose.model('Product', productSchema);


/* Updated 28 Mar
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Primary key
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Price: { type: Number, required: true },
  Images: { type: String, required: true },
  Variant1: { type: String },
  Variant2: { type: String },
  Variant3: { type: String },
  Category: { type: String, required: true },
  SubCategory: { type: String, required: true },
  Tags: { type: String },
});

// Add compound index for filtering by Category and SubCategory
productSchema.index({ Category: 1, SubCategory: 1 });

// Add text index for searching in Title and Description
productSchema.index({ Title: 'text', Description: 'text' });

// Add single-field index for sorting/filtering by Price
productSchema.index({ Price: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
*/