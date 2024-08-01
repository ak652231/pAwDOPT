const express = require('express');
const router = express.Router();
const { sendAdoptionSMS } = require('../controllers/smsController');
const auth = require('../middleware/auth');

router.post('/send-adoption-sms', auth, sendAdoptionSMS);

module.exports = router;