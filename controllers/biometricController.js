const biometricService = require('../services/biometricservice'); 
const axios = require('axios');
const Student = require('../models/Student');
const Fingerprint = require('../models/Fingerprint'); 

// exports.enrollFingerprint = async (req, res) => {
//   try {
//     const { studentId } = req.body;
//     console.log("Searching for student with ID:", studentId);
//     // Validate input
//     if (!studentId) {
//       return res.status(400).json({ error: 'Student ID is required' });
//     }
   
//     // Find the student in the database
//     const student = await Student.findById(studentId);
//     console.log(student);
//     if (!student) {
//       console.log("Student not found");
//       res.status(404).json({ error: 'Student not found' });
//     }

//     // Call the ESP32 to start fingerprint scanning
//     const result = await requestToESP(studentId, 'start');
//     console.log("Result from ESP32:", result);
    
//     // Return the response from the ESP32
//     res.json(result.message);
//   } catch (error) {
//     console.error("Error during enrollment:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.enrollFingerprint = async (req, res) => {
  try {
    const { studentId } = req.body;

    // Validate input
    if (!studentId) {
      return res.status(400).json({ error: 'Student ID is required' });
    }

    console.log("Searching for student with ID:", studentId);

    // Find the student in the database
    const student = await Student.findById(studentId);

    if (!student) {
      console.log("Student not found");
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log("Student found:", student);

    // Check if the student already has a fingerprint enrolled
    const existingFingerprint = await Fingerprint.findOne({ studentId });
    console.log(existingFingerprint);

    if (existingFingerprint) {
      console.log("Student already has a fingerprint enrolled. Deleting the old one...");

      // Delete the existing fingerprint document
      await Fingerprint.deleteOne({ _id: existingFingerprint._id }); // Delete the entire document
      console.log("Old fingerprint deleted.");
    }

    // Call the ESP32 to start fingerprint scanning
    const result = await requestToESP(studentId, 'start');
    console.log("Result from ESP32:", result);

    //Extract fingerprint data from the ESP32 response
    // const { deviceResponse } = result;
    // if (!deviceResponse || !deviceResponse.fingerprintData) {
    //   return res.status(500).json({ error: 'Fingerprint data not received from ESP32' });
    // }

    // console.log("Fingerprint data from ESP32:", deviceResponse);

    // Save the new fingerprint in the database
    const newFingerprint = new Fingerprint({
      studentId,
      fingerprintId: result.fingerprintData,
    });

    console.log("New Fingerprint:", newFingerprint);

    await newFingerprint.save();

    // Update the student with the new fingerprint reference
    student.fingerprintStatus = true; // Link the student to the new fingerprint
    console.log( student.fingerprintStatus);
    await student.save();

    // Send success response
    res.json({
      message: 'Fingerprint enrolled successfully',
    });

  } catch (error) {
    console.error("Error during enrollment:", error.message);
    res.status(500).json({ error: error.message });
  }
};

async function requestToESP(studentId, action) {
  try {
    console.log("This is request sent to ESP", studentId, action);

    if (!studentId || !action) {
      throw new Error('Missing parameters');
    }

    // Send request to the ESP32 device
    const response = await axios.post(`http://192.168.1.25/scan`, {
      studentId,
      action,
    });

    // Log the raw response for debugging
    console.log("Raw ESP32 Response:", response.data);

    // Extract fingerprint data from the ESP32 response
    const { message, fingerprintData } = response.data;
    if (!message || !fingerprintData) {
      throw new Error('Invalid response from ESP32');
    }

    // Return the response from the ESP32
    return { message, fingerprintData };
  } catch (error) {
    console.error("ESP communication failed:", error.message);
    throw new Error('ESP communication failed: ' + error.message);
  }
}

/**
 * Verify a fingerprint by comparing it with stored data.
 */
exports.verifyFingerprint = async (req, res) => {
  try {
    const { fingerprintId } = req.body;

    if (!fingerprintId) {
      return res.status(400).json({ error: 'Fingerprint ID is required' });
    }

    // Find the fingerprint in the database
    const fingerprint = await Fingerprint.findOne({ fingerprintId });
    if (!fingerprint) {
      return res.status(404).json({ message: 'Fingerprint not recognized' });
    }

    // Find the associated student
    const student = await Student.findById(fingerprint.studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Send success response
    res.json({ valid: true, student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};