const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');
const config = require('./config');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));

// Route Imports
const productRoutes = require('./routes/productRoutes');

// API Routes
app.use(config.API_PREFIX, productRoutes);

// Test route
app.get(config.API_PREFIX + '/test', (req, res) => {
  res.status(200).json({ success: true, message: 'API is working' });
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;

/*
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const productRoutes = require('./routes/productRoutes'); // Import routes

const app = express();

console.log('Starting server setup...');
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from frontend
console.log('CORS middleware configured for origin: http://localhost:5173');


app.use(express.json());
console.log('JSON parsing middleware configured.');

app.use('/uploads', express.static('uploads'));
console.log('Static file serving middleware configured for /uploads directory.');

// MongoDB connection
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB at', config.MONGODB_URI);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use the routes
app.use('/api', productRoutes);
console.log('Product routes registered under /api');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).send('Something broke!');
});

console.log('Server setup completed.');

module.exports = app;
*/