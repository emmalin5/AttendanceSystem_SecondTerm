const FingerprintService = require('../services/fingerprintService');

// Create a new fingerprint record
exports.createFingerprint = async (req, res) => {
  try {
    const { studentId, fingerprintId } = req.body;

    // Validate input
    if (!studentId || !fingerprintId) {
      return res.status(400).json({ error: "Missing required fields: 'studentId' and 'fingerprintId'" });
    }

    // Call the service to create the fingerprint
    const newFingerprint = await FingerprintService.createFingerprint(studentId, fingerprintId);

    res.status(201).json(newFingerprint);
  } catch (error) {
    console.error("Error creating fingerprint:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all fingerprints
exports.getAllFingerprints = async (req, res) => {
  try {
    const fingerprints = await FingerprintService.getAllFingerprints();
    res.status(200).json(fingerprints);
  } catch (error) {
    console.error("Error fetching fingerprints:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a fingerprint by ID
exports.getFingerprintById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid fingerprint ID" });
    }

    // Call the service to fetch the fingerprint
    const fingerprint = await FingerprintService.getFingerprintById(id);

    res.status(200).json(fingerprint);
  } catch (error) {
    console.error("Error fetching fingerprint:", error.message);
    res.status(error.message.includes('not found') ? 404 : 500).json({ error: error.message });
  }
};

// Update a fingerprint by ID
exports.updateFingerprint = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid fingerprint ID" });
    }

    // Call the service to update the fingerprint
    const updatedFingerprint = await FingerprintService.updateFingerprint(id, updates);

    res.status(200).json(updatedFingerprint);
  } catch (error) {
    console.error("Error updating fingerprint:", error.message);
    res.status(error.message.includes('not found') ? 404 : 500).json({ error: error.message });
  }
};

// Delete a fingerprint by ID
exports.deleteFingerprint = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid fingerprint ID" });
    }

    // Call the service to delete the fingerprint
    await FingerprintService.deleteFingerprint(id);

    res.status(200).json({ success: true, message: "Fingerprint deleted successfully" });
  } catch (error) {
    console.error("Error deleting fingerprint:", error.message);
    res.status(error.message.includes('not found') ? 404 : 500).json({ error: error.message });
  }
};