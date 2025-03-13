//const biometricService = require('../services/biometricservice'); // Import the service layer
const mongoose = require('mongoose'); // Import mongoose
const axios = require('axios'); // Import axios
const Student = require('../models/Student'); // Import the Student model

/**
 * Enroll a fingerprint for a student.
 */
exports.enrollFingerprintService = async (req, res) => {
  //return "Hello From enroll"
  
  const { studentId } = req.body;
    console.log("In enroll Service",studentId);
   res.json(studentId);
  
};
  // try {
  //   const { studentId } = req.body;
  //   console.log("In enroll Finger",req.body);
  //   // Validate input
  //   if (!studentId) {
  //     return res.status(400).json({ error: 'Student ID is required' });
  //   }
  //   // Find the student by ID
  //   const studentInDb = await Student.findById(studentId);  
  //   if(!studentInDb){
  //     return res.status(404).json({ error: 'Student not found' });
  //   }
  //   console.log("studentInDb",  studentInDb);

  //   // Call the service to handle fingerprint scanning and saving
  //   //const result = await biometricService.requestFingerprintToESP(studentId, 'start');

  //   // Send success response
  //   res.json(result);
  // } catch (error) {
  //   // Handle errors
  //   res.status(500).json({ error: error.message });
  // }
//};

/**
 * Verify a fingerprint by comparing it with stored data.
 */
exports.verifyFingerprint = async (req, res) => {
  try {
    const { fingerprintData } = req.body;
    console.log("In verify Fingerprint",req.body);
    // Validate input
    if (!fingerprintData) {
      return res.status(400).json({ error: 'Fingerprint data is required' });
    }

    // Find the student by fingerprint data
    const student = await Student.findOne({ fingerprint: fingerprintData });
    console.log("Found Fingerprint",student);
    if (!student) {
      return res.status(404).json({ message: 'Fingerprint not recognized' });
    }

    // Send success response
    res.json({ valid: true, student });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

/**
 * Request fingerprint scanning from the ESP32 device.
 */
exports.requestFingerprintToESP = async (req, res) => {
  try {
    const { studentId, action } = req.query;
    console.log("In requestFingerprintToESP",req.query);
    // Validate input
    if (!studentId || !action) {
      return res.status(400).json({ error: 'Missing parameters: studentId or action' });
    }

    // Send request to the ESP32 device
    const response = await axios.get(`http://esp-device-ip/api/fingerprint`, {
      params: { studentId, action },
    });

    // Send success response
    res.json({
      message: 'Request sent to ESP',
      deviceResponse: response.data,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'ESP communication failed' });
  }
};