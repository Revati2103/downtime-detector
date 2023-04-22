const Website = require('../models/Website');

const snoozeUrl = async (req, res) => {
  try {
    const website = await Website.findOneAndUpdate(
      {
        _id: req.params.id,
        snooze: false // Only update if not already snoozed
      },
      {
        $set: {
          snooze: true,
          lastChecked: new Date(),
        }
      },
      { new: true }
    );
    if (!website) {
      return res.status(404).json({ message: 'Website not found or already snoozed' });
    }
    // Redirect user to /app/snooze-info/:id
    return res.redirect(`/snooze-info/${website._id}`);
  } catch (error) {
    console.log(`Error snoozing website: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  snoozeUrl
};
