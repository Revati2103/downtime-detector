const twilio = require('twilio');
const dotenv = require('dotenv');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendVerificationCode = async (req, res) => {
  const { contactPhone } = req.body;

  try {
     // Generate a verification code and send it to the user's phone

     const verification = await 
     client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
     .verifications
     .create({
       to: contactPhone,
       channel: 'sms'
     });
 

    return res.status(200).json({ status: 'success', verificationSid: verification.sid });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Failed to send verification code.' });
  }
};

const verifyCode = async (req, res) => {
  const { contactPhone, code } = req.body;

  try {
  // Prompt the user to enter the verification code
    const verificationCheck = await 
    client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks
    .create({
      to: contactPhone,
      code: req.body.code
    });

    if (verificationCheck.status === 'approved') {
      return res.status(200).json({ status: 'success', message: 'Verification successful.' });
    } else {
      return res.status(401).json({ status: 'error', message: 'Verification failed.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Failed to verify code.' });
  }
};

module.exports = {
  sendVerificationCode,
  verifyCode
};
