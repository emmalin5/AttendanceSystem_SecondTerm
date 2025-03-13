const Teacher = require('../models/Teacher');

// Create a teacher
exports.createTeacher = async (data) => {
  try {
    const teacher = new Teacher(data);
    console.log(teacher);
    return await teacher.save();
  } catch (error) {
    throw new Error('Failed to create teacher');
  }
};

// Get all teachers
exports.getAllTeachers = async () => {
  try {
    return await Teacher.find(); 
  } catch (error) {
    throw new Error('Failed to fetch teachers');
  }
};

// Get a teacher by ID
exports.getTeacherById = async (id) => {
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) throw new Error('Teacher not found');
    return teacher;
  } catch (error) {
    throw error;
  }
};

// Update a teacher by ID
exports.updateTeacher = async (id, data) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(id, data, { new: true });
    if (!teacher) throw new Error('Teacher not found');
    return teacher;
  } catch (error) {
    throw new Error('Failed to update teacher');
  }
};

// Delete a teacher by ID
exports.deleteTeacher = async (id) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) throw new Error('Teacher not found');
    return teacher;
  } catch (error) {
    throw new Error('Failed to delete teacher');
  }
};