const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

// Create a course
router.post('/', courseController.createCourse);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a course by ID
router.get('/:id', courseController.getCourseById);

// Update a course by ID
router.put('/:id', courseController.updateCourse);

// Delete a course by ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;