const Subject = require('../models/Subject');

// Create a subject
exports.createSubject = async (data) => {
  try {
    const subject = new Subject(data);
    return await subject.save();
  } catch (error) {
    throw new Error('Failed to create subject');
  }
};

// Get all subjects
exports.getAllSubjects = async () => {
  try {
    return await Subject.find().populate('instructor_id'); // Populate instructor details if needed
  } catch (error) {
    throw new Error('Failed to fetch subjects');
  }
};

// Get a subject by ID
exports.getSubjectById = async (id) => {
  try {
    const subject = await Subject.findById(id).populate('instructor_id');
    if (!subject) throw new Error('Subject not found');
    return subject;
  } catch (error) {
    throw error;
  }
};

// Update a subject by ID
exports.updateSubject = async (id, data) => {
  try {
    const subject = await Subject.findByIdAndUpdate(id, data, { new: true });
    if (!subject) throw new Error('Subject not found');
    return subject;
  } catch (error) {
    throw new Error('Failed to update subject');
  }
};

// Delete a subject by ID
exports.deleteSubject = async (id) => {
  try {
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) throw new Error('Subject not found');
    return subject;
  } catch (error) {
    throw new Error('Failed to delete subject');
  }
};