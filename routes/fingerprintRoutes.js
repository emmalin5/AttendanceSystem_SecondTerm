const express = require('express');
const FingerprintController = require('../controllers/fingerprintcontroller');
const axios = require('axios');

const router = express.Router();

// Create a new fingerprint
router.post('/', FingerprintController.createFingerprint);

// Get all fingerprints
router.get('/', FingerprintController.getAllFingerprints);

// Get a fingerprint by ID
router.get('/:id', FingerprintController.getFingerprintById);

// Update a fingerprint by ID
router.put('/:id', FingerprintController.updateFingerprint);

// Delete a fingerprint by ID
router.delete('/:id', FingerprintController.deleteFingerprint);



// Start fingerprint scan
router.post('/start-scan', async (req, res) => {
  try {
    const { studentId } = req.body;
     console.log(studentId);
    if (!studentId) {
      return res.status(400).json({ error: "Student ID is required" });
    }
    // Notify ESP32 to start scan
    const esp32Url = process.env.ESP32_URL || "http://192.168.1.25/scan";
    const response = await axios.post(esp32Url, {
       
      action: "start_scan",
      studentId,
    });

    if (response.status !== 200) {
      throw new Error("Failed to notify ESP32");
    }

    // Respond with success message
    res.status(200).json({ success: true, message: "Scan initiated successfully" });
  } catch (error) {
    console.error("Error during scan initiation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Receive fingerprint data from ESP32
router.post('/receive-fingerprint', async (req, res) => {
  try {
    const { studentId, fingerprintId } = req.body;

    if (!studentId || !fingerprintId) {
      return res.status(400).json({ error: "Missing required fields: 'studentId' and 'fingerprintId'" });
    }

    // Save fingerprint data to the database
    const savedFingerprint = await FingerprintService.createFingerprint(studentId, fingerprintId);

    res.status(201).json({ success: true, message: "Fingerprint saved successfully", data: savedFingerprint });
  } catch (error) {
    console.error("Error saving fingerprint:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

