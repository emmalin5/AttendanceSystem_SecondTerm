const subjectService = require('../services/subjectService');

// Create a subject
exports.createSubject = async (req, res) => {
  try {
    console.log(req.body);
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json(subject);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    res.status(200).json(subject);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a subject by ID
exports.updateSubject = async (req, res) => {
  try {
    const subject = await subjectService.updateSubject(req.params.id, req.body);
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a subject by ID
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await subjectService.deleteSubject(req.params.id);
    res.status(200).json({ message: 'Subject deleted successfully', subject });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};