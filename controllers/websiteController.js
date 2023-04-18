const Website = require('../models/websiteModel');
const sendNotification = require('../config/sendNotification');

exports.createWebsite = async (req, res, next) => {
  try {
    const { url, contact } = req.body;

    // Check if website already exists
    const existingWebsite = await Website.findOne({ url });
    if (existingWebsite) {
      return res.status(400).send('Website already exists');
    }

    // Create new website
    const website = new Website({ url, contact });
    await website.save();

    res.status(201).json(website);
  } catch (err) {
    next(err);
  }
};

exports.deleteWebsite = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete website
    const website = await Website.findByIdAndDelete(id);
    if (!website) {
      return res.status(404).send('Website not found');
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.checkWebsites = async (req, res, next) => {
  try {
    const websites = await Website.find();

    for (const website of websites) {
      try {
        const response = await fetch(website.url);
        const isUp = response.ok;

        // Update website status and last checked time
        website.status = isUp ? 'up' : 'down';
        website.lastChecked = new Date();
        await website.save();

        // Send notification if website is down
        if (!isUp) {
          await sendNotification(website.contact, website.url);
        }
      } catch (err) {
        console.error(err);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
