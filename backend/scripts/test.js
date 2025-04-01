const { MongoClient } = require('mongodb');

// PASTE YOUR CONNECTION STRING HERE (replace <password>)
//const uri = "mongodb+srv://sunil:REPLACE_WITH_YOUR_PASSWORD@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://sunil:PxCj6QYVtLVi2Kfr@cluster0.bxqtu5q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("🎉 Connected successfully to MongoDB Atlas!");
    console.log("📊 Databases:", await client.db().admin().listDatabases());
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await client.close();
  }
}

run();