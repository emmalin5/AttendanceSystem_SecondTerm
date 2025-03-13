const CourseSubject = require('../models/courseSubject');

// Create a relationship
exports.createCourseSubject = async (data) => {
  try {
    const courseSubject = new CourseSubject(data);
    return await courseSubject.save();
  } catch (error) {
    throw new Error('Failed to create course-subject relationship');
  }
};

// Get all relationships
exports.getAllCourseSubjects = async () => {
  try {
    return await CourseSubject.find()
      .populate('course_id')
      .populate('subject_id');
  } catch (error) {
    throw new Error('Failed to fetch course-subject relationships');
  }
};

// Get a relationship by ID
exports.getCourseSubjectById = async (id) => {
  try {
    const courseSubject = await CourseSubject.findById(id)
      .populate('course_id')
      .populate('subject_id');
    if (!courseSubject) throw new Error('Relationship not found');
    return courseSubject;
  } catch (error) {
    throw error;
  }
};

// Update a relationship by ID
exports.updateCourseSubject = async (id, data) => {
  try {
    const courseSubject = await CourseSubject.findByIdAndUpdate(id, data, { new: true });
    if (!courseSubject) throw new Error('Relationship not found');
    return courseSubject;
  } catch (error) {
    throw new Error('Failed to update relationship');
  }
};

// Delete a relationship by ID
exports.deleteCourseSubject = async (id) => {
  try {
    const courseSubject = await CourseSubject.findByIdAndDelete(id);
    if (!courseSubject) throw new Error('Relationship not found');
    return courseSubject;
  } catch (error) {
    throw new Error('Failed to delete relationship');
  }
};