const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Import the connectDB function
const Fingerprint = require('./models/Fingerprint'); // Import the Fingerprint model

// Function to check if fingerprintId exists in the database
async function checkFingerprintExists(fingerprintId) {
  try {
    // Query the database for the fingerprintId
    const fingerprint = await Fingerprint.findOne({ fingerprintId });

    if (fingerprint) {
      console.log(`Fingerprint ID ${fingerprintId} exists in the database.`);
      return true; // ID exists
    } else {
      console.log(`Fingerprint ID ${fingerprintId} does not exist in the database.`);
      return false; // ID does not exist
    }
  } catch (error) {
    console.error('Error while checking fingerprint existence:', error.message);
    return false;
  }
}

// Main function to connect to the database and check the fingerprintId
(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const fingerprintIdToCheck = 'FP-12345';

    // Check if the fingerprintId exists
    const check = await checkFingerprintExists(fingerprintIdToCheck);
    console.log("The data is in check:", check); // Logs true or false
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    // Close the database connection after the operation
    mongoose.connection.close();
  }
})();