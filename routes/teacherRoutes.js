const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

// Create a teacher
router.post('/', teacherController.createTeacher);

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Get a teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Update a teacher by ID
router.put('/:id', teacherController.updateTeacher);

// Delete a teacher by ID
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;