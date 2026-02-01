const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://keshavgupta86036:FST2023k@cluster0.06aqope.mongodb.net/test?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true';

async function checkExistingCategories() {
  let client;
  
  try {
    console.log('🔄 Connecting to MongoDB...');
    client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db();
    const categoriesCol = db.collection('categories');
    
    console.log('🔄 Fetching existing categories...');
    const categories = await categoriesCol.find({}).toArray();
    
    console.log(`\n📊 Found ${categories.length} existing categories:\n`);
    
    categories.forEach((category, index) => {
      console.log(`${index + 1}. Name: "${category.name}" | Slug: "${category.slug}" | Active: ${category.active}`);
    });
    
    if (categories.length === 0) {
      console.log('No categories found in database.');
    } else {
      console.log('\n💡 If you want to create a category with slug "job", you need to:');
      console.log('1. Use a different slug like "jobs", "job-listings", "employment", etc.');
      console.log('2. Or delete the existing category with slug "job" first');
      console.log('3. Or edit the existing category instead of creating a new one');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔄 Connection closed');
    }
  }
}

checkExistingCategories();