// Google Gemini API 테스트 스크립트
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const apiKey = process.env.GOOGLE_API_KEY;

console.log('Google API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found');

if (!apiKey) {
  console.error('❌ GOOGLE_API_KEY not found in .env file');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testGoogleAPI() {
  console.log('\n🔍 Testing Google Gemini API...\n');

  try {
    // Try different model names
    const modelNamesToTry = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.5-flash-001',
      'gemini-1.5-flash-002',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro-latest',
      'models/gemini-pro',
      'models/gemini-1.5-flash'
    ];

    for (const modelName of modelNamesToTry) {
      try {
        console.log(`Trying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello, respond with "Hi"');
        const response = await result.response;
        const text = response.text();

        console.log(`✅ SUCCESS with model: ${modelName}`);
        console.log(`Response: ${text}`);
        console.log(`\n✨ Working model found: ${modelName}\n`);
        break;
      } catch (error) {
        console.log(`❌ Failed: ${error.message.substring(0, 100)}...`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n📋 Troubleshooting steps:');
    console.error('1. Check API key at: https://aistudio.google.com/app/apikey');
    console.error('2. Make sure Gemini API is enabled');
    console.error('3. Check if your region supports Gemini API');
    console.error('4. Try creating a new API key');
  }
}

testGoogleAPI();
