// models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
  {
    fingerprint_id: {
      type: String,
      required: false
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: false
    },
    courseSubject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseSubject',
      required: false
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: false
    },
    date: {
      type: Date,
      required: false
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late'],
      default: 'Present'
    },
    remarks: {
      type: String
    },
    recorded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', AttendanceSchema);

