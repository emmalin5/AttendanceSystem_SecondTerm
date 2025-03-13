const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Create an attendance record
exports.createAttendance = async (data) => {
  try {
    // Validate fingerprint_id
    const student = await Student.findOne({ fingerprint_template: data.fingerprint_id });
    if (!student) throw new Error('Invalid fingerprint ID');

    // Add student_id to the attendance record for reference
    data.student_id = student._id;

    const attendance = new Attendance(data);
    return await attendance.save();
  } catch (error) {
    throw new Error(`Failed to create attendance record: ${error.message}`);
  }
};

// Get all attendance records
exports.getAllAttendance = async () => {
  try {
    return await Attendance.find()
      .populate('class_id')
      .populate('recorded_by');
  } catch (error) {
    throw new Error('Failed to fetch attendance records');
  }
};

// Get an attendance record by ID
exports.getAttendanceById = async (id) => {
  try {
    const attendance = await Attendance.findById(id)
      .populate('class_id')
      .populate('recorded_by');
    if (!attendance) throw new Error('Attendance record not found');
    return attendance;
  } catch (error) {
    throw error;
  }
};

// Update an attendance record by ID
exports.updateAttendance = async (id, data) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(id, data, { new: true });
    if (!attendance) throw new Error('Attendance record not found');
    return attendance;
  } catch (error) {
    throw new Error('Failed to update attendance record');
  }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (id) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) throw new Error('Attendance record not found');
    return attendance;
  } catch (error) {
    throw new Error('Failed to delete attendance record');
  }
};