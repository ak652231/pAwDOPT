const User = require('../models/User');
const Pet = require('../models/Pet');
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_NUMBER;

const client = twilio(accountSid, authToken);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: `+91${to}`
    });
    console.log(`Message sent successfully. SID: ${message.sid}`);
    return message.sid;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

exports.sendAdoptionSMS = async (req, res) => {
  try {
    const userId = req.user.id;
    const { petId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }

    const to = user.number;
    const message = `Hello ${user.name}, your adoption request for ${pet.name} has been successfully submitted. Track your request status at: http://yourdomain.com/track-request/${petId}`;

    const messageSid = await sendSMS(to, message);
    res.status(200).json({ success: true, messageSid });
  } catch (error) {
    console.error('Error in sendAdoptionSMS:', error);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
};