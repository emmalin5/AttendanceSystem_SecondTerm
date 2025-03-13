const Class = require('../models/Class');

// Create a class
exports.createClass = async (data) => {
  try {
    const newClass = new Class(data);
    return await newClass.save();
  } catch (error) {
    throw new Error('Failed to create class');
  }
};

// Get all classes
exports.getAllClasses = async () => {
  try {
    return await Class.find()
      .populate('course_id')
      .populate('teacher_id')
      .populate('subject_id')
      .populate('room_id');
  } catch (error) {
    throw new Error('Failed to fetch classes');
  }
};

// Get a class by ID
exports.getClassById = async (id) => {
  try {
    const classData = await Class.findById(id)
      .populate('course_id')
      .populate('teacher_id')
      .populate('subject_id')
      .populate('room_id');
    if (!classData) throw new Error('Class not found');
    return classData;
  } catch (error) {
    throw error;
  }
};

// Update a class by ID
exports.updateClass = async (id, data) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(id, data, { new: true });
    if (!updatedClass) throw new Error('Class not found');
    return updatedClass;
  } catch (error) {
    throw new Error('Failed to update class');
  }
};

// Delete a class by ID
exports.deleteClass = async (id) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) throw new Error('Class not found');
    return deletedClass;
  } catch (error) {
    throw new Error('Failed to delete class');
  }
};