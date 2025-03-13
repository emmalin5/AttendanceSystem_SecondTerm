const teacherService = require('../services/teacherService');

// Create a teacher
exports.createTeacher = async (req, res) => {
  try {
    console.log(req.body);
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    console.error("Error saving teacher:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.id);
    res.status(200).json(teacher);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a teacher by ID
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.updateTeacher(req.params.id, req.body);
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.deleteTeacher(req.params.id);
    res.status(200).json({ message: 'Teacher deleted successfully', teacher });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};