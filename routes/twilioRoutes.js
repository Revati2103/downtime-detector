const express = require('express');
const router = express.Router();
const twilioController = require('../controllers/twilioController');

// Endpoint for sending verification code
//router.post('/sendVerificationCode', twilioController.sendVerificationCode);

module.exports = router;
