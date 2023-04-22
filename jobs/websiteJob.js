const Website = require('../models/Website');
const fetch = require('node-fetch');
const twilio = require('twilio');
const dotenv = require('dotenv');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const checkWebsites = async () => {
 // console.log('Checking websites...');
  let websites = await Website.find();
  //console.log(`Found ${websites.length} websites`);
  
  for (let website of websites) {
    try {
      if (!website || !website.url) {
        console.log(`Error: Website object is not defined or missing properties`);
        continue;
      }
      
      const response = await fetch(website.url);
      
      if (!response.ok && !website.snooze) {
        // const snoozeUrl = `http://localhost:${process.env.PORT}/api/snooze/${website._id}`;
        const snoozeUrl = `https://25f4-2600-1700-4570-21e0-29d8-d633-469d-cbd8.ngrok-free.app/api/snooze/${website._id}`;
        console.log(snoozeUrl);
        const message = await client.messages.create({
          body: `Your website ${website.url} is down. Click here to snooze notifications: <a href="${snoozeUrl}">Snooze</a>`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: website.phone,
        });
        console.log(message.sid);
      }
      
      website.lastChecked = Date.now();
      await website.save();
      
    } catch (error) {
      console.log(`Error checking website ${website.url}: ${error.message}`);
    }
  }
};



  module.exports = { checkWebsites };