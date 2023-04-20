const Website = require('../models/Website');
const fetch = require('node-fetch');
const twilio = require('twilio');
const dotenv = require('dotenv');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const createWebsite = async (req, res) => {
  const { websiteUrl, contactEmail, contactPhone } = req.body;
  const website = new Website({
    url: websiteUrl,
    email: contactEmail,
    phone: contactPhone,
    lastChecked: Date.now()
  });

  try {
    await website.save();
    const response = await fetch(websiteUrl);
    if (response.ok) {
      return res.status(200).json({ message: 'Website is up and running!' });
    } else {
      const message = await client.messages.create({
        body: `The website ${websiteUrl} is down.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: website.phone
      });
      console.log(message.sid);
      return res.status(200).json({ message: 'Website is down. Notification sent to contact phone.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to save website.' });
  }
};

const checkWebsites = async () => {
  const websites = await Website.find();
  websites.forEach(async (website) => {
    try {
      if (!website || !website.websiteUrl || !website.regex) {
        console.log(`Error: Website object is not defined or missing properties`);
        return;
      }
      const response = await fetch(website.websiteUrl);
      if (!response.ok && !website.snooze) {
        const snoozeUrl = `http://localhost:${process.env.PORT}/api/snooze/${website._id}`;
        const message = await client.messages.create({
          body: `Your website ${website.websiteUrl} is down. Click here to snooze notifications: ${snoozeUrl}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: website.phone,
        });
        console.log(message.sid);
      }
      if (!website.regex.match(/^\/.+\/[a-z]*$/)) {
        console.log(`Error: Invalid regular expression "${website.regex}"`);
        return;
      }
      const regex = new RegExp(website.regex);
      const body = await response.text();
      if (regex.test(body)) {
        console.log(`Website ${website.websiteUrl} matched regex ${website.regex}`);
      } else {
        console.log(`Website ${website.websiteUrl} did not match regex ${website.regex}`);
      }
      website.lastChecked = Date.now();
      await website.save();
    } catch (error) {
      console.log(`Error checking website ${website.websiteUrl}: ${error.message}`);
    }
  });
};



module.exports = {
  createWebsite,
  checkWebsites
};
