// models/Class.js
const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema(
  {
    courseSubject: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'CourseSubject', 
      required: true 
    },
    teacher_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Teacher', 
      required: true 
    },
    room_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Room', 
      required: true 
    },
    start_time: { 
      type: Date, 
      required: true 
    },
    end_time: { 
      type: Date, 
      required: true 
    },
    day_of_week: { 
      type: String, 
      required: true 
    },
    class_type: { 
      type: String, 
      required: true 
    },
    max_capacity: { 
      type: Number, 
      required: true 
    },
    enrolled_students: { 
      type: Number, 
      default: 0 
    },
    attendance_record_url: { 
      type: String 
    },
    notes: { 
      type: String 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Class', ClassSchema);