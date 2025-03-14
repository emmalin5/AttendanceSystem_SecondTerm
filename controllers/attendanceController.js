const attendanceService = require('../services/attendanceService');

// Create Attendance
exports.createAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Attendances
exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await attendanceService.getAllAttendances();
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Attendance by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await attendanceService.getAttendanceById(req.params.id);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update Attendance
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.updateAttendance(
      req.params.id,
      req.body
    );
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.deleteAttendance(req.params.id);
    res.status(200).json({ message: 'Attendance deleted', attendance });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};