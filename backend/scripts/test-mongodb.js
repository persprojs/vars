const mongoose = require('mongoose');

const connectionString = 'mongodb://sunilganotra:desiPwd1@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-xxxx-shard-0&authSource=admin&retryWrites=true&w=majority';


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
  mongoose.connection.close(); // Close the connection after successful connection
})
.catch(err => {
  console.error('Connection error:', err);
});
