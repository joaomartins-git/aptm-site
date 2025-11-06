const fetch = require('node-fetch');

async function testContactAPI() {
  console.log('Testing contact API endpoint...');

  // Test 1: Valid payload (should work)
  console.log('\n=== Test 1: Valid payload ===');
  const validPayload = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message with more than 10 characters.'
  };

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validPayload),
    });

    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Test 2: Invalid payload (should return 400)
  console.log('\n=== Test 2: Invalid payload ===');
  const invalidPayload = {
    name: 'A', // Too short
    email: 'invalid-email', // Invalid format
    message: 'Short' // Too short
  };

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidPayload),
    });

    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Test 3: Rate limiting (need server running for this)
  console.log('\n=== Test 3: Rate limiting ===');
  console.log('Send two requests quickly to test rate limiting...');

  try {
    // First request
    const response1 = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validPayload),
    });

    const result1 = await response1.json();
    console.log('First request status:', response1.status);
    console.log('First request response:', result1);

    // Second request immediately (should be rate limited)
    const response2 = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Another User',
        email: 'another@example.com',
        message: 'Another test message with sufficient length.'
      }),
    });

    const result2 = await response2.json();
    console.log('Second request status:', response2.status);
    console.log('Second request response:', result2);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Only run if called directly
if (require.main === module) {
  testContactAPI();
}

module.exports = { testContactAPI };