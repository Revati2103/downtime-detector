const express = require('express');
const router = express.Router();
const {createWebsite} = require('../controllers/websiteController');

// Endpoint for creating a new website
router.post('/createWebsite', createWebsite);

module.exports = router;
