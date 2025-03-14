const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    department: { type: String, required: false },
    credits: { type: Number, required: false },
    instructor_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    prerequisites: { type: String },
    syllabus_url: { type: String },
    resources: { type: String },
    evaluation_method: { type: String },
    status: { type: String, default: 'Active' },
    description: { type: String, default: '' },
    notes: { type: String, default: '' },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subject', SubjectSchema);