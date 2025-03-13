const roomService = require('../services/roomService');

// Create a room
exports.createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a room by ID
exports.updateRoom = async (req, res) => {
  try {
    const room = await roomService.updateRoom(req.params.id, req.body);
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a room by ID
exports.deleteRoom = async (req, res) => {
  try {
    const room = await roomService.deleteRoom(req.params.id);
    res.status(200).json({ message: 'Room deleted successfully', room });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};