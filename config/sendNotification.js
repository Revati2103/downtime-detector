const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

const sendNotification = async (contact, url) => {
  try {
    const message = `Your website ${url} is down. Please check it as soon as possible.`;
    const notification = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: contact,
    });

    console.log(`Notification sent to ${notification.to}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendNotification;
