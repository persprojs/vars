const fs = require('fs');
const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/yourDatabaseName'; // Replace with your database name

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Run the aggregate command to get index stats
    const indexStats = await db.collection('products').aggregate([{ $indexStats: {} }]).toArray();

    // Convert the output to JSON format
    const logData = JSON.stringify(indexStats, null, 2);

    // Write the output to a log file
    fs.writeFileSync('indexStats.log', logData, 'utf8');
    console.log('Index stats logged to indexStats.log');

    // Close the database connection
    mongoose.disconnect();
  } catch (error) {
    console.error('Error fetching index stats:', error);
    mongoose.disconnect();
  }
});
