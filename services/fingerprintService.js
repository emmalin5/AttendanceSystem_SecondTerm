const Fingerprint = require('../models/Fingerprint');
const Student = require('../models/Student');

const { ObjectId } = require('mongoose').Types;
const axios = require('axios');

class FingerprintService {
  // Create a new fingerprint record
  static async createFingerprint(studentId, fingerprintId) {
    try {
      const newFingerprint = await Fingerprint.create({ studentId, fingerprintId });
      return newFingerprint;
    } catch (error) {
      throw new Error(`Failed to create fingerprint: ${error.message}`);
    }
  }

  // Get all fingerprints
  static async getAllFingerprints() {
    try {
      const fingerprints = await Fingerprint.find();
      return fingerprints;
    } catch (error) {
      throw new Error(`Failed to fetch fingerprints: ${error.message}`);
    }
  }

  // Get a fingerprint by ID
  static async getFingerprintById(id) {
    try {
      const fingerprint = await Fingerprint.findById(id);
      if (!fingerprint) {
        throw new Error('Fingerprint not found');
      }
      return fingerprint;
    } catch (error) {
      throw new Error(`Failed to fetch fingerprint: ${error.message}`);
    }
  }

  // Update a fingerprint by ID
  static async updateFingerprint(id, updates) {
    try {
      const updatedFingerprint = await Fingerprint.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
      if (!updatedFingerprint) {
        throw new Error('Fingerprint not found');
      }
      return updatedFingerprint;
    } catch (error) {
      throw new Error(`Failed to update fingerprint: ${error.message}`);
    }
  }

  // Delete a fingerprint by ID
  static async deleteFingerprint(id) {
    try {
      const deletedFingerprint = await Fingerprint.findByIdAndDelete(id);
      if (!deletedFingerprint) {
        throw new Error('Fingerprint not found');
      }
      return deletedFingerprint;
    } catch (error) {
      throw new Error(`Failed to delete fingerprint: ${error.message}`);
    }
  }

}

module.exports = FingerprintService;