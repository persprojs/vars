const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3003,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://sunil:desiPwd1@cluster0.bxqtu5q.mongodb.net/productionDB?retryWrites=true&w=majority', // Added productionDB
  FRONTEND_URL: process.env.FRONTEND_URL
};