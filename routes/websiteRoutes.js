const express = require('express');
const { createWebsite, deleteWebsite, checkWebsites } = require('../controllers/websiteController');

const router = express.Router();

router.post('/', createWebsite);
router.delete('/:id', deleteWebsite);
router.get('/check', checkWebsites);

module.exports = router;
