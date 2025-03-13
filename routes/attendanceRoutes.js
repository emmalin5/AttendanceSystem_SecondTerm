const express = require('express');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();

// Create an attendance record
router.post('/', attendanceController.createAttendance);

// Get all attendance records
router.get('/', attendanceController.getAllAttendance);

// Get an attendance record by ID
router.get('/:id', attendanceController.getAttendanceById);

// Update an attendance record by ID
router.put('/:id', attendanceController.updateAttendance);

// Delete an attendance record by ID
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;