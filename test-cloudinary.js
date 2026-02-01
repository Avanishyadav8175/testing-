// Test Cloudinary configuration
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'santoshkumarkurka85',
  api_key: 'db_userQtyRw670IsZN1Y9Kh',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret_here',
});

async function testCloudinaryConnection() {
  try {
    console.log('Testing Cloudinary connection...');
    console.log('Cloud Name:', cloudinary.config().cloud_name);
    console.log('API Key:', cloudinary.config().api_key);
    console.log('API Secret:', cloudinary.config().api_secret ? '***configured***' : '❌ NOT SET');
    
    if (!cloudinary.config().api_secret || cloudinary.config().api_secret === 'your_api_secret_here') {
      console.log('\n❌ CLOUDINARY_API_SECRET is not set in .env file');
      console.log('Please add your actual API secret to .env file:');
      console.log('CLOUDINARY_API_SECRET=your_actual_secret_here');
      return;
    }

    // Test API connection
    const result = await cloudinary.api.ping();
    console.log('\n✅ Cloudinary connection successful!');
    console.log('Status:', result.status);
    
  } catch (error) {
    console.error('\n❌ Cloudinary connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('Invalid API key')) {
      console.log('\n💡 Please check your API credentials in .env file');
    }
  }
}

testCloudinaryConnection();