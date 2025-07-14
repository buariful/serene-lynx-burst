#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Trustii Integration...\n');

const envContent = `# Trustii API Configuration
# Replace with your actual API key from https://docs.trustii.co/verif/docs/api/human-resources
VITE_TRUSTII_API_KEY=tr_test_dummy_key_123456789abcdef

# Trustii API Base URL (optional - defaults to production)
VITE_TRUSTII_API_BASE_URL=https://api.trustii.co/hr/v1

# Development Configuration
VITE_DEBUG=true
VITE_APP_NAME=Serene Lynx Burst
VITE_APP_VERSION=1.0.0

# Note: This is a dummy API key for testing purposes.
# In production, replace with your actual Trustii API key.
# The dummy key will cause API calls to fail, but allows you to test the UI and form validation.
`;

const envPath = path.join(process.cwd(), '.env');

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists. Skipping creation.');
    console.log('   If you want to add Trustii configuration, manually add these lines to your .env file:');
    console.log('\n' + envContent);
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file with dummy Trustii API key');
  }
} catch (error) {
  console.error('❌ Failed to create .env file:', error.message);
  console.log('\n📝 Please manually create a .env file with the following content:');
  console.log('\n' + envContent);
}

console.log('\n🚀 Next steps:');
console.log('1. Start your development server: npm run dev');
console.log('2. Visit http://localhost:8080/trustii-demo to test the integration');
console.log('3. Replace the dummy API key with your real Trustii API key when ready');
console.log('4. Get your API key from: https://docs.trustii.co/verif/docs/api/human-resources\n');

console.log('📚 For more information, see TRUSTII_INTEGRATION.md'); 