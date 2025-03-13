const attendanceService = require('../services/attendanceService');

// Create an attendance record
exports.createAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await attendanceService.getAllAttendance();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await attendanceService.getAttendanceById(req.params.id);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update an attendance record by ID
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.updateAttendance(req.params.id, req.body);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.deleteAttendance(req.params.id);
    res.status(200).json({ message: 'Attendance record deleted successfully', attendance });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};