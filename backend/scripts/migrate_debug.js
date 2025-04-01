const { MongoClient } = require('mongodb');

// Hardcoded connection strings
const LOCAL_URI = 'mongodb://localhost:27017/ecommerce';
const ATLAS_URI = 'mongodb+srv://sunil:PxCj6QYVtLVi2Kfr@cluster0.bxqtu5q.mongodb.net/productionDB?retryWrites=true&w=majority&appName=Cluster0';

// Debug function with timestamp
function debug(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

async function main() {
  let localClient, atlasClient;
  
  try {
    debug('🔌 Attempting to connect to LOCAL database...');
    localClient = await MongoClient.connect(LOCAL_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000
    });
    debug('✅ Local connection established');

    debug('🔌 Attempting to connect to ATLAS database...');
    atlasClient = await MongoClient.connect(ATLAS_URI, {
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000
    });
    debug('✅ Atlas connection established');

    const localDb = localClient.db();
    const atlasDb = atlasClient.db();
    
    debug('🔍 Verifying collections exist...');
    const localCollections = await localDb.listCollections().toArray();
    const atlasCollections = await atlasDb.listCollections().toArray();
    
    debug(`Local collections: ${localCollections.map(c => c.name).join(', ')}`);
    debug(`Atlas collections: ${atlasCollections.map(c => c.name).join(', ')}`);

    const localCollection = localDb.collection('products');
    const atlasCollection = atlasDb.collection('products');

    debug('⏳ Counting local documents...');
    const localCount = await localCollection.countDocuments();
    debug(`📦 Local documents found: ${localCount}`);

    if (localCount === 0) {
      throw new Error('No documents found in local collection');
    }

    debug('🚀 Starting migration...');
    const cursor = localCollection.find();
    let migratedCount = 0;

    while (await cursor.hasNext()) {
      const batch = await cursor.next();
      await atlasCollection.insertOne(batch);
      migratedCount++;
      if (migratedCount % 100 === 0) {
        debug(`🔄 Migrated ${migratedCount} documents...`);
      }
    }

    debug(`✅ Final migration count: ${migratedCount}`);
    debug('🎉 Migration completed successfully!');

  } catch (err) {
    debug(`❌ FATAL ERROR: ${err.message}`);
    console.error(err.stack);
  } finally {
    debug('🧹 Closing connections...');
    if (localClient) await localClient.close();
    if (atlasClient) await atlasClient.close();
    debug('🏁 Script completed');
  }
}

// Add listener for unhandled rejections
process.on('unhandledRejection', (err) => {
  debug(`⚠️ Unhandled rejection: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

main();