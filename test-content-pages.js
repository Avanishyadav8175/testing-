const testUrls = [
  'http://localhost:3000/job/testing01',
  'http://localhost:3000/internship/testing01', // This should work if internship content exists
  'http://localhost:3000/scholarship/testing01', // This should work if scholarship content exists
  'http://localhost:3000/category/government-jobs',
  'http://localhost:3000/category/internships',
];

async function testUrl(url) {
  try {
    const response = await fetch(url);
    console.log(`${url}: ${response.status} ${response.statusText}`);
    return response.status === 200;
  } catch (error) {
    console.log(`${url}: ERROR - ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('Testing content page URLs...\n');
  
  for (const url of testUrls) {
    await testUrl(url);
  }
  
  console.log('\nTest completed!');
}

runTests();