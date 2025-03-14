const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Fingerprint = require('../models/Fingerprint');

async function checkFingerprintExists(fingerprintId) {
  try {
    const fingerprint = await Fingerprint.findOne({ fingerprintId });
    return !!fingerprint;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

// Wrap in async IIFE to use await
(async () => {
  try {
    await connectDB(); // Connect to database first
    
    const fingerprintIdToCheck = 'FP-12345';
    const check = await checkFingerprintExists(fingerprintIdToCheck);
    
    console.log(`Fingerprint ID ${fingerprintIdToCheck} exists:`, check);
  } catch (error) {
    console.error('Main error:', error);
  } finally {
    mongoose.connection.close();
  }
})();

export default checkFingerprintExists;