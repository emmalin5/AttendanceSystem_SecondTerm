const express = require('express');
const subjectController = require('../controllers/subjectController');

const router = express.Router();

// Create a subject
router.post('/', subjectController.createSubject);

// Get all subjects
router.get('/', subjectController.getAllSubjects);

// Get a subject by ID
router.get('/:id', subjectController.getSubjectById);

// Update a subject by ID
router.put('/:id', subjectController.updateSubject);

// Delete a subject by ID
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;