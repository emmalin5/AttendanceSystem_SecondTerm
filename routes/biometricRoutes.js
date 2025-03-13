const express = require('express');
const biometricController = require('../controllers/biometricController');

const router = express.Router();
router.post('/enroll', biometricController.enrollFingerprint);
router.post('/verify', biometricController.verifyFingerprint);
router.get('/', (req, res) => {
    res.send('Hello from Biometric API!');
  });
module.exports = router;