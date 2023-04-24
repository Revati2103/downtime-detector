const express = require('express');
const router = express.Router();
const {sendVerificationCode, verifyCode} = require('../controllers/twilioController');

// Endpoint for sending verification code
router.post('/generate', sendVerificationCode); 
router.post('/verify', verifyCode); 

module.exports = router;
