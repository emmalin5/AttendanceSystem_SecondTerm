const WebSocket = require('ws');
const mongoose = require('mongoose');
const getTestData = require('./services/test');

const attendanceService = require('./services/attendanceService'); // Import attendance service

// Create a WebSocket server on the specified IP and port
const wss = new WebSocket.Server({ host: '192.168.1.7', port: 3001 });

console.log('WebSocket server is running on ws://192.168.1.7:3001');

wss.on('connection', (ws) => {
    console.log('A new client connected.');

    // Send a welcome message to the client
    ws.send('Welcome to the WebSocket server!');

    // Listen for messages from the client
    ws.on('message', async (message) => {
        console.log(`Received message: ${message}`);

        try {
            // Parse the incoming message
            const data = JSON.parse(message);
            fingerprint = data.fingerprint_id;
            console.log("Message: ", data.message); 
            const testData = getTestData(fingerprint);
            console.log("Test Data Response",testData);

            // Call the createAttendance function with the parsed data
            const student = await attendanceService.createAttendance(fingerprint);
            console.log("Student: ", student);
            // Send a success response to the client
            ws.send(JSON.stringify({ status: 'success', data: student }));
        } catch (error) {
            // Send an error response to the client
            ws.send(JSON.stringify({ status: 'error', message: error.message }));
        }

        // Broadcast the message to all connected clients (optional)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast: ${message}`);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});