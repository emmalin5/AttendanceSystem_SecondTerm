const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: false, unique: false },
    phone_number: { type: String, required: false, unique: false },
    fingerprintStatus: { type:Boolean, required: false },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false },
    major: { type: String, required: false }, // e.g., "Embedded", "Software Engineering", "Knowledge Engineering", 
    enrollment_date: { type: Date, required: false },
    credits_earned: { type: Number, default: 0 },
    address: { type: String },
    date_of_birth: { type: Date },
    gender: { type: String },
    nationality: { type: String },
    gpa: { type: Number, default: 0 },
    status: { type: String, default: 'Active' }, // e.g., "Active", "Inactive", "Graduated"
    advisor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required:false },
    emergency_contact_name: { type: String },
    emergency_contact_phone: { type: String },
    profile_picture_url: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);