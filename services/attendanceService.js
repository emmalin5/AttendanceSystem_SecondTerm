const mongoose = require('mongoose');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Class = require('../models/Class');
const Teacher = require('../models/Teacher');
const CourseSubject = require('../models/CourseSubject');
const Fingerprint = require('../models/Fingerprint');

// Create Attendance
// Example function in attendanceService

// async function createAttendance(data) {
//   try {
//     // Validate student fingerprint
//     console.log(data.fingerprint_id);
    
//     const fingerprint = await Fingerprint.findOne({ fingerprintId: data.fingerprint_id });
//     if (!fingerprint) throw new Error('Fingerprint not found.');
//     console.log(fingerprint.studentId);
//     const student = await Student.findById(fingerprint.studentId);
//     if (!student) throw new Error('Student not found.');


//     // Validate class session
//     //const classSession = await Class.findById(data.class_id);
//     //if (!classSession) throw new Error('Class not found.');

//     // Check if class is ongoing (with 15-minute buffer before start)
//     //const currentTime = new Date();
//     //const startTime = new Date(classSession.start_time);
//     //const endTime = new Date(classSession.end_time);
//     //const allowedStartTime = new Date(startTime.getTime() - 15 * 60 * 1000); // 15-minute buffer

//     // if (currentTime < allowedStartTime || currentTime > endTime) {
//     //   throw new Error('Class is not in session.');
//     // }

//     // Validate student enrollment in the course
//     // const courseSubject = await CourseSubject.findById(classSession.courseSubject);
//     // const course = await course.findOne({ _id: courseSubject.course_id });
//     // if (!student.course_id.equals(course._id)) {
//     //   throw new Error('Student not enrolled in this course.');
//     // }

//     // Check for existing attendance today
//     // const today = new Date(currentTime.toDateString()); // Normalize date to start of day
//     // const existingRecord = await Attendance.findOne({
//     //   student: student._id,
//     //   class_id: classSession._id,
//     //   date: { $gte: today },
//     // });
//     // if (existingRecord) throw new Error('Attendance already marked today.');

//     // Validate teacher
//     // const teacher = await Teacher.findById(data.recorded_by);
//     // if (!teacher) throw new Error('Teacher not found.');

//     // // Create attendance record
//     // const attendance = new Attendance({
//     //   fingerprint_id: data.fingerprint_id,
//     //   student: student._id,
//     //   courseSubject: courseSubject._id,
//     //   class_id: classSession._id,
//     //   date: new Date(),
//     //   status: data.status || 'Present',
//     //   remarks: data.remarks,
//     //   recorded_by: teacher._id,
//     // });

//     // await attendance.save();
//     return student;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }


async function createAttendance(data) {
  try {
    // Validate student fingerprint
    console.log("Data: ", data);
    
    const fingerprint = await Fingerprint.findOne({ fingerprintId: data.fingerprint_id });
    if (!fingerprint) throw new Error('Fingerprint not found.');
    const student = await Student.findById(fingerprint.studentId);
    if (!student) throw new Error('Student not found.');



    
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
}
// Get All Attendances
async function getAllAttendances() {
  try {
    return await Attendance.find()
      .populate('student')
      .populate('courseSubject')
      .populate('class_id')
      .populate('recorded_by');
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get Attendance by ID
async function getAttendanceById(id) {
  try {
    const attendance = await Attendance.findById(id)
      .populate('student')
      .populate('courseSubject')
      .populate('class_id')
      .populate('recorded_by');
    if (!attendance) throw new Error('Attendance not found.');
    return attendance;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Update Attendance (e.g., status or remarks)
async function updateAttendance(id, updates) {
  try {
    const attendance = await Attendance.findById(id);
    if (!attendance) throw new Error('Attendance not found.');

    // Update only allowed fields
    if (updates.status) attendance.status = updates.status;
    if (updates.remarks) attendance.remarks = updates.remarks;

    await attendance.save();
    return attendance;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Delete Attendance
async function deleteAttendance(id) {
  try {
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) throw new Error('Attendance not found.');
    return attendance;
  } catch (error) {
    throw new Error(error.message);
  }
}


// function handleWebSocketConnection(io) {
//   io.on('connection', (socket) => {
//     console.log('ESP32 connected:', socket.id);

//     // Listen for attendance marking event
//     socket.on('markAttendance', async (data) => {
//       try {
//         const attendance = await attendanceService.createAttendance(data);
//         socket.emit('attendanceResponse', attendance);
//       } catch (error) {
//         socket.emit('attendanceError', { message: error.message });
//       }
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('ESP32 disconnected:', socket.id);
//     });
//   });
// }

module.exports = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  //handleWebSocketConnection
};

