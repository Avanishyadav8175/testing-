const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://keshavgupta86036:FST2023k@cluster0.06aqope.mongodb.net/test?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true';

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
};

async function testMongoConnection() {
  let client;
  
  try {
    console.log('🔄 Testing MongoDB connection...');
    console.log('URI:', uri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    client = new MongoClient(uri, options);
    
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    
    console.log('🔄 Testing database operations...');
    const db = client.db();
    
    // Test ping
    await db.command({ ping: 1 });
    console.log('✅ MongoDB ping successful!');
    
    // Test collection access
    const collections = await db.listCollections().toArray();
    console.log(`✅ Found ${collections.length} collections`);
    
    // Test a simple query
    const bannersCol = db.collection('banners');
    const bannerCount = await bannersCol.countDocuments();
    console.log(`✅ Banners collection has ${bannerCount} documents`);
    
    console.log('✅ MongoDB connection test successful!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\n💡 SSL/TLS Error Solutions:');
      console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
      console.log('2. Try updating MongoDB driver: npm update mongodb');
      console.log('3. Check if your network blocks MongoDB ports');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\n💡 Authentication Error Solutions:');
      console.log('1. Check username and password in connection string');
      console.log('2. Verify database user permissions in MongoDB Atlas');
    }
    
  } finally {
    if (client) {
      await client.close();
      console.log('🔄 MongoDB connection closed');
    }
  }
}

testMongoConnection();