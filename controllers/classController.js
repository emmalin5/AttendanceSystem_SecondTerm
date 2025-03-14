const classService = require('../services/classService');

// Create a class
exports.createClass = async (req, res) => {
  try {
    const newClass = await classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await classService.getAllClasses();
    console.log(classes);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a class by ID
exports.getClassById = async (req, res) => {
  try {
    const classData = await classService.getClassById(req.params.id);
    res.status(200).json(classData);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a class by ID
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await classService.updateClass(req.params.id, req.body);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await classService.deleteClass(req.params.id);
    res.status(200).json({ message: 'Class deleted successfully', class: deletedClass });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};