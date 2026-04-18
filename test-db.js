// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB URI...");
// Mask password in log:
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log(`Connecting to: ${maskedUri}`);

mongoose.connect(uri)
  .then(() => {
    console.log("✅ SUCCESS: Successfully connected to MongoDB Atlas!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ FAILED: Could not connect to MongoDB Atlas. Error details:");
    console.error(err.message);
    process.exit(1);
  });
