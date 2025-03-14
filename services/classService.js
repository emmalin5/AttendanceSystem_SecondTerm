const Class = require('../models/Class');

exports.createClass = async (data) => {
  try {
    // Validate start_date's day matches days_of_week
    const startDate = new Date(data.start_date);
    const startDateDay = startDate.toLocaleDateString('en-US', { weekday: 'long' });
    if (!data.days_of_week.includes(startDateDay)) {
      throw new Error(`start_date must be one of the specified days_of_week: ${data.days_of_week.join(', ')}`);
    }
    const newClass = new Class(data);
    return await newClass.save();
  } catch (error) {
    throw new Error(`Failed to create class: ${error.message}`);
  }
};

exports.getAllClasses = async () => {
  try {
    return await Class.find()
      .populate('subject', 'name code')
      .populate('teacher', 'name email')
      .populate('room', 'name capacity');
  } catch (error) {
    throw new Error('Failed to fetch classes');
  }
};

exports.getClassById = async (id) => {
  try {
    const classData = await Class.findById(id)
      .populate('subject')
      .populate('teacher')
      .populate('room');
    if (!classData) throw new Error('Class not found');
    return classData;
  } catch (error) {
    throw error;
  }
};

exports.updateClass = async (id, data) => {
  try {
    const classDoc = await Class.findById(id);
    if (!classDoc) throw new Error('Class not found');
    Object.assign(classDoc, data);
    await classDoc.save(); // Triggers pre-save validation
    return classDoc;
  } catch (error) {
    throw new Error('Failed to update class');
  }
};

exports.deleteClass = async (id) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) throw new Error('Class not found');
    return deletedClass;
  } catch (error) {
    throw new Error('Failed to delete class');
  }
};

// Implementing the missing getSession method
exports.getClassSessions = async (classId) => {
  try {
    const classData = await Class.findById(classId);
    if (!classData) throw new Error('Class not found');

    const sessions = [];
    const startDate = new Date(classData.start_date);
    const endDate = new Date(classData.end_date);

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      if (classData.days_of_week.includes(currentDay)) {
        sessions.push({
          date: currentDate.toISOString().split('T')[0],
          start_time: classData.start_time,
          end_time: classData.end_time,
          classId: classData._id
        });
      }
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return sessions;
  } catch (error) {
    throw new Error(`Failed to generate sessions: ${error.message}`);
  }
};