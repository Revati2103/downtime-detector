const Website = require('../models/Website');
const fetch = require('node-fetch');
const twilio = require('twilio');
const dotenv = require('dotenv');
require('dotenv').config();
const {verifyCode} = require('./twilioController');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const createWebsite = async (req, res) => {
  const { websiteUrl, contactPhone } = req.body;

  try {
    // Verify the user's phone number using the verification code
    const verificationStatus = await verifyCode(req, res);

    // If verification failed, return error response
    if (verificationStatus !== 'approved') {
      return res.status(401).json({ message: 'Verification failed.' });
    }

    // Verification successful, save the website to MongoDB
    const website = new Website({
      url: websiteUrl,
      phone: contactPhone,
      lastChecked: Date.now()
    });
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

module.exports = {
  createWebsite,
};


