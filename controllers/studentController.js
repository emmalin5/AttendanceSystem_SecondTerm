const studentService = require('../services/studentService');

// Create a student
exports.createStudent = async (req, res) => {
  try {
    
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  try {
    console.log("Tet",req.params.id);
    const student = await studentService.getStudentById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);
    res.status(200).json({ message: 'Student deleted successfully', student });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};