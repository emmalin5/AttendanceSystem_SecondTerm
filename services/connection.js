const WebSocket = require('ws');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Fingerprint = require('../models/Fingerprint');

// Function to check if a fingerprint exists in the database
async function checkFingerprintExists(fingerprintId) {
  try {
    const fingerprint = await Fingerprint.findOne({ fingerprintId });
    return !!fingerprint; // Return true if found, false otherwise
  } catch (error) {
    console.error('Error checking fingerprint:', error.message);
    return false;
  }
}

// Create a WebSocket server on port 3001
const wss = new WebSocket.Server({ port: 3001 }, () => {
  console.log('WebSocket server is running on ws://localhost:3001');
});

// Event listener for when a client connects
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  // Handle messages received from the client
  ws.on('message', async (message) => {
    console.log(`Received message: ${message}`);

    // Parse the JSON message
    try {
      const data = JSON.parse(message);
      console.log(`Parsed data:`, data);

      // Extract the fingerprint_id from the received data
      const fingerprintId = data.fingerprint_id;

      if (!fingerprintId) {
        console.error('No fingerprint_id found in the received message');
        ws.send(JSON.stringify({ status: 'error', message: 'Missing fingerprint_id' }));
        return;
      }

      // Connect to the database and check if the fingerprint exists
      try {
        await connectDB(); // Connect to the database
        console.log("Connected to MongoDB");

        const check = await checkFingerprintExists(fingerprintId);

        console.log(`Fingerprint ID ${fingerprintId} exists:`, check);

        // Send a response back to the client
        const response = {
          status: 'success',
          message: `Fingerprint ID ${fingerprintId} received`,
          exists: check,
        };
        ws.send(JSON.stringify(response));
      } catch (dbError) {
        console.error('Database error:', dbError.message);
        ws.send(JSON.stringify({ status: 'error', message: 'Database error' }));
      } finally {
        // Close the database connection after processing
        mongoose.connection.close();
      }
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError.message);
      ws.send(JSON.stringify({ status: 'error', message: 'Invalid JSON format' }));
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error.message);
  });
});