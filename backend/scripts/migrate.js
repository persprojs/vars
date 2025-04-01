const { MongoClient } = require('mongodb');

// Hardcoded connection strings (replace if needed)
const LOCAL_URI = 'mongodb://localhost:27017/ecommerce'; // Your local DB
const ATLAS_URI = 'mongodb+srv://sunil:PxCj6QYVtLVi2Kfr@cluster0.bxqtu5q.mongodb.net/productionDB?retryWrites=true&w=majority&appName=Cluster0';

(async () => {
  try {
    console.log('🔌 Connecting to databases...');
    
    // 1. Connect to both databases
    const localClient = await MongoClient.connect(LOCAL_URI);
    const atlasClient = await MongoClient.connect(ATLAS_URI);
    console.log('✅ Connections established');

    // 2. Get references to collections
    const localDb = localClient.db();
    const atlasDb = atlasClient.db();
    const localCollection = localDb.collection('products');
    const atlasCollection = atlasDb.collection('products');

    // 3. Fetch all products from local DB
    console.log('⏳ Fetching local products...');
    const products = await localCollection.find().toArray();
    console.log(`📦 Found ${products.length} products to migrate`);

    // 4. Insert into Atlas (empty target collection first)
    console.log('🧹 Clearing Atlas collection...');
    await atlasCollection.deleteMany({});
    
    console.log('🚀 Migrating products to Atlas...');
    const result = await atlasCollection.insertMany(products);
    console.log(`✅ Successfully migrated ${result.insertedCount} products`);

    // 5. Verify counts match
    const localCount = await localCollection.countDocuments();
    const atlasCount = await atlasCollection.countDocuments();
    console.log(`🔢 Count verification - Local: ${localCount} | Atlas: ${atlasCount}`);

    if (localCount === atlasCount) {
      console.log('🎉 Migration successful!');
    } else {
      console.warn('⚠️ Count mismatch - verify data manually');
    }

  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    process.exit();
  }
})();