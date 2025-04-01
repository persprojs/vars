const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Enhanced logging
console.log('Starting server setup...');
console.log('MongoDB URI:', config.MONGODB_URI);
console.log('Frontend URL:', config.FRONTEND_URL);

// Middleware
console.log('Setting up CORS with origin:', config.FRONTEND_URL);
//app.use(cors({ origin: config.FRONTEND_URL }));
// Enable CORS for all origins (or specify allowed origins)
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

app.use(express.json());

// Database connection with enhanced logging
console.log('Attempting to connect to MongoDB...');
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    // Verify collection exists
    mongoose.connection.db.listCollections({ name: 'products' }).next((err, collinfo) => {
      if (collinfo) {
        console.log('✔️ Products collection exists');
      } else {
        console.warn('❌ Products collection missing!');
      }
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Route mounting with verification
app.use('/api', productRoutes);
console.log('Routes mounted at /api');

// Add a test route
app.get('/api/healthcheck', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ 
    status: 'healthy',
    dbState: mongoose.connection.readyState,
    routes: productRoutes.stack.map(layer => layer.route?.path).filter(Boolean)
  });
});

// Start server
const PORT = config.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('Try these test endpoints:');
  console.log(`- Local:  http://localhost:${PORT}/api/healthcheck`);
  console.log(`- Render: https://tmp8-backend.onrender.com/api/healthcheck`);
});
