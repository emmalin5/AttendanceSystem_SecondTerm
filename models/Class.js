const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema(
  {
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    day_of_week: { type: String, required: true }, // e.g., "Monday", "Tuesday"
    class_type: { type: String, required: true }, // e.g., "Lecture", "Lab", "Seminar"
    max_capacity: { type: Number, required: true },
    enrolled_students: { type: Number, default: 0 },
    attendance_record_url: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Class', ClassSchema);