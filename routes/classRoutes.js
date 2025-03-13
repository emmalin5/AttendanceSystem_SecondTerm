const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

// Create a class
router.post('/', classController.createClass);

// Get all classes
router.get('/', classController.getAllClasses);

// Get a class by ID
router.get('/:id', classController.getClassById);

// Update a class by ID
router.put('/:id', classController.updateClass);

// Delete a class by ID
router.delete('/:id', classController.deleteClass);

module.exports = router;