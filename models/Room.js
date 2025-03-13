const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g., "Room 201"
    capacity: { type: Number, required: true },
    type: { type: String, required: true }, // e.g., "Classroom", "Lab", "Auditorium"
    location: { type: String, required: true }, // e.g., "Building A, Floor 2"
    equipment: { type: String }, // Optional: List of equipment (e.g., "Projector, Whiteboard")
    status: { type: String, default: 'Available' }, // e.g., "Available", "Occupied", "Under Maintenance"
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', RoomSchema);