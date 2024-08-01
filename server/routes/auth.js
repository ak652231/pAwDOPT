const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', authController.signUp);
router.get('/userprofile',auth, authController.getUserProfile);
router.put('/edituser',auth,authController.EditUserById);
router.get('/getusers',authController.getUsers);
router.get('/:id',authController.getUserById);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.login(req, res);
  }
);

module.exports = router;
