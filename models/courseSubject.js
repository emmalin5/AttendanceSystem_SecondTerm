const mongoose = require('mongoose');

const CourseSubjectSchema = new mongoose.Schema(
  {
    course_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course', 
      required: true 
    },
    subject_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Subject', 
      required: true 
    },
    semester: { 
      type: String, 
      required: false 
    }, // e.g., "Fall 2023"
    year: { 
      type: Number, 
      required: false 
    }, // e.g., 2023
    notes: { 
      type: String 
    },
  },
  { 
    timestamps: true,
    collection: 'course_subjects' // Explicitly name the collection
  }
);
CourseSubjectSchema.index({ course_id: 1, subject_id: 1, semester: 1, year: 1 }, { unique: true });

if (mongoose.models.CourseSubject) {
  module.exports = mongoose.model('CourseSubject');
} else {
  module.exports = mongoose.model('CourseSubject', CourseSubjectSchema);
}
// Index to prevent duplicate relationships
