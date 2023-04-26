const Website = require('../models/Website');
const fetch = require('node-fetch');
const twilio = require('twilio');
const dotenv = require('dotenv');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const checkWebsites = async () => {
  let websites = await Website.find();
  for (let website of websites) {
    try {
      if (!website || !website.url) {
        console.log(`Error: Website object is not defined or missing properties`);
        continue;
      }
      
      const response = await fetch(website.url);
      
      if (!response.ok && !website.snooze) {
        const snoozeUrl = `${process.env.URL_PREFIX}/api/snooze/${website._id}`;

        console.log(snoozeUrl);

        const requestOptions = {
          method: 'PUT',
        };

        const message = await client.messages.create({
          body: `Your website ${website.url} is down. Click here to snooze notifications: ${snoozeUrl}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: website.phone,
        });

        console.log(message.sid);
        
        // Send a PUT request to the snooze endpoint
        await fetch(snoozeUrl, requestOptions);
      }
      
      website.lastChecked = Date.now();
      await website.save();
      
    } catch (error) {
      console.log(`Error checking website ${website.url}: ${error.message}`);
    }
  }
};




  module.exports = { checkWebsites };