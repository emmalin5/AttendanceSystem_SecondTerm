const express = require('express');
const courseSubjectController = require('../controllers/courseSubjectController');

const router = express.Router();

// Create a relationship
router.post('/', courseSubjectController.createCourseSubject);

// Get all relationships
router.get('/', courseSubjectController.getAllCourseSubjects);

// Get a relationship by ID
router.get('/:id', courseSubjectController.getCourseSubjectById);

// Update a relationship by ID
router.put('/:id', courseSubjectController.updateCourseSubject);

// Delete a relationship by ID
router.delete('/:id', courseSubjectController.deleteCourseSubject);

module.exports = router;