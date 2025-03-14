const mongoose = require('mongoose'); // Import mongoose

const FingerprintSchema = new mongoose.Schema({
  studentId: {
    type:String,
    required: true,
  },
  fingerprintId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Fingerprint', FingerprintSchema);