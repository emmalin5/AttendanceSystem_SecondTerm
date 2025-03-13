// const mongoose = require('mongoose');

// const CourseSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     year_level: { type: Number, required: true },
//     section: { type: String, required: true },
//     description: { type: String },
//     instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
//     //credits: { type: Number, required: true },
//     start_date: { type: Date },
//     end_date: { type: Date },
//     //capacity: { type: Number },
//     //enrolled_students: { type: Number, default: 0 },
//     status: { type: String, default: 'Active' },
//     //prerequisites: { type: String },   // Implement if you tme
//     //syllabus_url: { type: String },
//     notes: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Course', CourseSchema);


const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year_level: { type: Number, required: true },
    section: { type: String, required: true },
    description: { type: String },
    instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    start_date: { type: Date },
    end_date: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);