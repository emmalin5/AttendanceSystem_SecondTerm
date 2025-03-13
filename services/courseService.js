const Course = require('../models/Course');

// Create a course
exports.createCourse = async (data) => {
  try {
    const course = new Course(data);
    return await course.save();
  } catch (error) {
    throw new Error('Failed to create course');
  }
};

// Get all courses
exports.getAllCourses = async () => {
  try {
    return await Course.find().populate('instructor_id'); // Populate instructor details if needed
  } catch (error) {
    throw new Error('Failed to fetch courses');
  }
};

// Get a course by ID
exports.getCourseById = async (id) => {
  try {
    const course = await Course.findById(id).populate('instructor_id');
    if (!course) throw new Error('Course not found');
    return course;
  } catch (error) {
    throw error;
  }
};

// Update a course by ID
exports.updateCourse = async (id, data) => {
  try {
    const course = await Course.findByIdAndUpdate(id, data, { new: true });
    if (!course) throw new Error('Course not found');
    return course;
  } catch (error) {
    throw new Error('Failed to update course');
  }
};

// Delete a course by ID
exports.deleteCourse = async (id) => {
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) throw new Error('Course not found');
    return course;
  } catch (error) {
    throw new Error('Failed to delete course');
  }
};