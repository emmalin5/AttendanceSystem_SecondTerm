const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
  {
    fingerprint_id: { type: String, required: true }, // Fingerprint template (unique identifier)
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: Date, required: true }, // Date of attendance
    status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Present' }, // Attendance status
    remarks: { type: String }, // Optional remarks (e.g., "Late by 10 minutes")
    recorded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Teacher who recorded attendance
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', AttendanceSchema);