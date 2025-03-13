const Student = require('../models/Student');

// Create a student
exports.createStudent = async (data) => {
  try {
    const student = new Student(data);
    return await student.save();
  } catch (error) {
    throw new Error(error);
  }
};

// Get all students
exports.getAllStudents = async () => {
  try {
    return await Student.find()
      .populate('course_id')
      .populate('advisor_id');
  } catch (error) {
    throw new Error('Failed to fetch students');
  }
};

// Get a student by ID
exports.getStudentById = async (id) => {
  try {
    const student = await Student.findById(id)
      .populate('course_id')
      .populate('advisor_id');
    if (!student) throw new Error('Student not found');
    console.log(student);
    return student;
  } catch (error) {
    throw error;
  }
};

// exports.getStudentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const student = await Student.findById(id)
//       .populate("course_id")
//       .populate("advisor_id")
//       .populate("fingerprintId"); // Include fingerprint data if available

//     if (!student) {
//       return res.status(404).json({ error: "Student not found" });
//     }

//     return res.status(200).json(student);
//   } catch (error) {
//     console.error("Error fetching student details:", error.message);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// Update a student by ID
exports.updateStudent = async (id, data) => {
  try {
    const student = await Student.findByIdAndUpdate(id, data, { new: true });
    if (!student) throw new Error('Student not found');
    return student;
  } catch (error) {
    throw new Error('Failed to update student');
  }
};

// Delete a student by ID
exports.deleteStudent = async (id) => {
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) throw new Error('Student not found');
    return student;
  } catch (error) {
    throw new Error('Failed to delete student');
  }
};