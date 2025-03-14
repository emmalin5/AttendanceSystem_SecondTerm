const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);
router.get('/:id/sessions', classController.getClassSessions);

module.exports = router;