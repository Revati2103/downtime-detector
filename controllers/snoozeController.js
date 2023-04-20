const Website = require('../models/Website');

const snoozeUrl = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    website.snooze = true;
    await website.save();
    return res.json({ message: 'Website snoozed successfully' });
  } catch (error) {
    console.log(`Error snoozing website: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  snoozeUrl
};