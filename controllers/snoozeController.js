const Website = require('../models/Website');
const dotenv = require('dotenv');
require('dotenv').config();

const snoozeUrl = async (req, res) => {
  try {

    const website = await Website.findByIdAndUpdate(
      req.params.id,
      { snooze: true, lastChecked: new Date() },
      { new: true }
    );
    
    if (!website) {
      return res.status(404).json({ success: false, message: 'Website not found or already snoozed' });
    }
    //return res.status(200).json({ success: true });
    // Redirect user to /app/snooze-info/:id
    return res.redirect(301, 'https://downtime-detector.vercel.app/snooze-info');
  } catch (error) {
    console.log(`Error snoozing website: ${error.message}`);
    return res.status(500).json({success:false, message: 'Internal server error' });
  }
};

const getSnoozeInfo = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    return res.status(200).json({ website });
  } catch (error) {
    console.log(`Error getting website info: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  snoozeUrl,
  getSnoozeInfo
};
