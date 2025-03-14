const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Create Attendance
router.post('/', attendanceController.createAttendance);

// Get All Attendances
router.get('/', attendanceController.getAllAttendances);

// Get Attendance by ID
router.get('/:id', attendanceController.getAttendanceById);

// Update Attendance
router.put('/:id', attendanceController.updateAttendance);

// Delete Attendance
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;