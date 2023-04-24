const express = require('express');
const router = express.Router();
const {sendVerificationCode, verifyCode} = require('../controllers/twilioController');

// Endpoint for sending verification code
router.post('/verify', sendVerificationCode);
router.get('/verify', verifyCode);

module.exports = router;
