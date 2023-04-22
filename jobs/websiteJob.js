const Website = require('../models/Website');
const fetch = require('node-fetch');
const twilio = require('twilio');
const dotenv = require('dotenv');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

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

  module.exports = { checkWebsites };