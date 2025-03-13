const Room = require('../models/Room');

// Create a room
exports.createRoom = async (data) => {
  try {
    const room = new Room(data);
    return await room.save();
  } catch (error) {
    throw new Error('Failed to create room');
  }
};

// Get all rooms
exports.getAllRooms = async () => {
  try {
    return await Room.find();
  } catch (error) {
    throw new Error('Failed to fetch rooms');
  }
};

// Get a room by ID
exports.getRoomById = async (id) => {
  try {
    const room = await Room.findById(id);
    if (!room) throw new Error('Room not found');
    return room;
  } catch (error) {
    throw error;
  }
};

// Update a room by ID
exports.updateRoom = async (id, data) => {
  try {
    const room = await Room.findByIdAndUpdate(id, data, { new: true });
    if (!room) throw new Error('Room not found');
    return room;
  } catch (error) {
    throw new Error('Failed to update room');
  }
};

// Delete a room by ID
exports.deleteRoom = async (id) => {
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) throw new Error('Room not found');
    return room;
  } catch (error) {
    throw new Error('Failed to delete room');
  }
};