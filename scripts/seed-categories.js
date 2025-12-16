// Script to seed categories into MongoDB
// Run with: node scripts/seed-categories.js

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const lines = envFile.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  } catch (error) {
    console.log('Note: .env file not found, using default MongoDB URI');
  }
}

async function seedCategories() {
  // Load environment variables
  loadEnv();
  
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const categoriesCol = db.collection('categories');

    // Read sample categories
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'sample-categories.json'), 'utf8')
    );

    // Check if categories already exist
    const existingCount = await categoriesCol.countDocuments();
    if (existingCount > 0) {
      console.log(`\nFound ${existingCount} existing categories.`);
      console.log('Skipping seed to avoid duplicates.');
      console.log('\nTo re-seed:');
      console.log('1. Delete existing categories from MongoDB');
      console.log('2. Run this script again');
      return;
    }

    // Add timestamps to each category
    const now = new Date();
    const categories = categoriesData.map(cat => ({
      ...cat,
      created_at: now,
      updated_at: now,
    }));

    // Insert categories
    const result = await categoriesCol.insertMany(categories);
    console.log(`\n✓ Successfully inserted ${result.insertedCount} categories`);

    // Display inserted categories
    console.log('\nInserted categories:');
    categories.forEach((cat, i) => {
      console.log(`  ${i + 1}. ${cat.name} (${cat.slug})`);
    });

    console.log('\n✓ Seeding complete!');
    console.log('\nNext steps:');
    console.log('1. Go to http://localhost:3000/admin/dashboard/categories');
    console.log('2. Edit each category to upload custom images');
    console.log('3. Adjust button colors as needed');
    console.log('4. Start adding jobs!');

  } catch (error) {
    console.error('\n✗ Error seeding categories:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check if MongoDB is running');
    console.error('2. Verify MONGODB_URI in .env file');
    console.error('3. Ensure you have network access to MongoDB');
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedCategories();
