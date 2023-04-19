const express = require('express');
const { createWebsite, checkWebsites } = require('../controllers/websiteController');

const router = express.Router();

router.post('/', createWebsite);
router.get('/check', checkWebsites);

module.exports = router;
