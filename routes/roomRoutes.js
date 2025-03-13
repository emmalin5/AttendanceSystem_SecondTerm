const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

// Create a room
router.post('/', roomController.createRoom);

// Get all rooms
router.get('/', roomController.getAllRooms);

// Get a room by ID
router.get('/:id', roomController.getRoomById);

// Update a room by ID
router.put('/:id', roomController.updateRoom);

// Delete a room by ID
router.delete('/:id', roomController.deleteRoom);

module.exports = router;