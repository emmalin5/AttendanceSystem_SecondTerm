require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');
const axios = require('axios');
const PORT = 3000;

// Routes
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const biometricRoutes = require('./routes/biometricRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
// const newteacherRoutes = require('./routes/newteacherRoutes');
const courseRoutes = require('./routes/courseRoutes');
const roomRoutes = require('./routes/roomRoutes');
const classRoutes = require('./routes/classRoutes');
const courseSubjectRoutes = require('./routes/courseSubjectRoutes');
const fingerprintRoutes = require('./routes/fingerprintRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);




// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
// app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/biometric', biometricRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/teachers', teacherRoutes);
// app.use('/api/newteachers', newteacherRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/course-subjects', courseSubjectRoutes);
app.use('/api/fingerprints', fingerprintRoutes);


// Serve static files
app.use(express.static('public'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'School Management System API', version: '1.0.0' });
});

// WebSocket setup
io.on('connection', (socket) => {
  console.log('A client connected via WebSocket.');

  // Handle "startScan" event from the client
  socket.on('startScan', async ({ studentId }) => {
    console.log(`Starting fingerprint scan for student ID: ${studentId}`);

    try {
      // Simulate a fingerprint scan process (replace this with actual logic)
      const scanResult = await simulateFingerprintScan(studentId);

      if (scanResult.success) {
        // Send success response to the client
        socket.emit('scanResult', { status: 'success', message: 'Fingerprint registered successfully!' });
      } else {
        // Send failure response to the client
        socket.emit('scanResult', { status: 'error', message: 'Fingerprint scan failed.' });
      }
    } catch (error) {
      console.error('Error during fingerprint scan:', error.message);

      // Send error response to the client
      socket.emit('scanResult', { status: 'error', message: 'An error occurred during the scan.' });
    }
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});

// Simulate fingerprint scan (replace this with actual hardware integration)
async function simulateFingerprintScan(studentId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate success or failure based on some logic
      const success = Math.random() > 0.2; // 80% chance of success
      resolve({ success });
    }, 3000); // Simulate a 3-second scan process
  });
}

// Start the server
server.listen(PORT, '192.168.1.7', () => {
  console.log(`Server is running at http://192.168.1.7:${PORT}`);
  console.log(`WebSocket server is listening on ws://192.168.1.7:${PORT}`);
});