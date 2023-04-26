const express = require('express');
const router = express.Router();
const {snoozeUrl, getSnoozeInfo} = require('../controllers/snoozeController');


router.put('/:id', snoozeUrl); 
router.get('/:id', getSnoozeInfo); 

module.exports = router;