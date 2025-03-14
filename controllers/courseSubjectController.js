const courseSubjectService = require('../services/coursesubjectService');

// Create a course-subject relationship
exports.createCourseSubject = async (req, res) => {
  try {
    console.log(req.body);
    const courseSubject = await courseSubjectService.createCourseSubject(req.body);
    res.status(201).json(courseSubject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all relationships
exports.getAllCourseSubjects = async (req, res) => {
  try {
    const relationships = await courseSubjectService.getAllCourseSubjects();
    res.status(200).json(relationships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a relationship by ID
exports.getCourseSubjectById = async (req, res) => {
  try {
    const relationship = await courseSubjectService.getCourseSubjectById(req.params.id);
    res.status(200).json(relationship);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a relationship by ID
exports.updateCourseSubject = async (req, res) => {
  try {
    const relationship = await courseSubjectService.updateCourseSubject(req.params.id, req.body);
    res.status(200).json(relationship);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a relationship by ID
exports.deleteCourseSubject = async (req, res) => {
  try {
    const relationship = await courseSubjectService.deleteCourseSubject(req.params.id);
    res.status(200).json({ message: 'Relationship deleted successfully', relationship });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};