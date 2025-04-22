const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema(
  {
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId,ref: 'Teacher',required: true},
    room: { type: mongoose.Schema.Types.ObjectId,ref: 'Room', required: true },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    },
    days_of_week: {
      type: [String],
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    start_time: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:mm format
    },
    end_time: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    class_type: {
      type: String,
      required: true,
      enum: ['Lecture', 'Lab', 'Seminar', 'Workshop']
    },
    max_capacity: {
      type: Number,
      required: true,
      min: 1
    },
    enrolled_students: {
      type: Number,
      default: 0,
      min: 0
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

// Validation: Ensure start_date is before end_date
ClassSchema.pre('save', function (next) {
  if (this.start_date >= this.end_date) {
    next(new Error('start_date must be before end_date'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Class', ClassSchema);