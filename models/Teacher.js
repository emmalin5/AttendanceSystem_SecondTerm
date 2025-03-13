const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    hire_date: { type: Date, required: false },
    fingerprint_template: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: false, unique: false },
    position: { type: String, required: false },
    qualifications: { type: String, required: false },
    date_of_birth: { type: Date, required: false },
    gender: { type: String, required: false },
    employment_type: { type: String, required: false, default: "Full-time" },
    salary: { type: Number, required: false },
    research_interests: { type: String, required: false },
    publications: { type: String, required: false },
    grants_awarded: { type: String, required: false },
    performance_rating: { type: String, required: false, default: "Not Rated" },
    last_evaluation_date: { type: Date, required: false },
    profile_picture_url: { type: String, required: false },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', TeacherSchema);