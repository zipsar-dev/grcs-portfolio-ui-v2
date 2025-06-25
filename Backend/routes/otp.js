const express = require('express');
const router = express.Router();
const { sendSMS } = require('../services/smsService');
const User = require('../models/User');  // Adjust based on your model structure
const { createError } = require('../utils/error');
const { validateRequest } = require('../services/validator');


// In-memory OTP storage with expiration (replace with Redis or DB in production)
const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(phoneNumber);
}

router.post('/send-otp', async (req, res) => {
  let { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }
  
  //phoneNumber = normalizePhoneNumber(phoneNumber);

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ success: false, message: 'Invalid phone number format' });
  }

  // Rate limiting (simple version)
  const lastRequest = otpStore.get(`${phoneNumber}_last_request`);
  if (lastRequest && Date.now() - lastRequest < 60000) { // 1 minute cooldown
    return res.status(429).json({
      success: false,
      message: 'Please wait before requesting another OTP'
    });
  }

  const otp = generateOTP();
  const result = await sendSMS({ phoneNumber, message: `Dear user, use OTP ${otp} to complete your GEEAAR registration. If not requested, please ignore the message. - GEEAAR Family`, templateId: '1707173469550162347' });

  if (!result.success) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again later.'
    });
  }

  // Store OTP with 5-minute expiration
  const expiryTime = Date.now() + 5 * 60 * 1000;
  otpStore.set(phoneNumber, {
    otp,
    expiry: expiryTime
  });

  // Record last request time for rate limiting
  otpStore.set(`${phoneNumber}_last_request`, Date.now());

  // Set cleanup timeout
  setTimeout(() => {
    if (otpStore.get(phoneNumber)?.expiry === expiryTime) {
      otpStore.delete(phoneNumber);
    }
  }, 5 * 60 * 1000);
    
  return res.status(200).json({
    success: true,
    message: 'OTP sent successfully'
  });
});

router.post('/verify-otp', async (req, res, next) => {
  let { phoneNumber, otp } = req.body;

  if (!phoneNumber) return next(createError(400, 'Phone number is required'));
  if (!otp || otp.trim() === '') return next(createError(400, 'OTP is required'));
  if (!isValidPhoneNumber(phoneNumber)) return next(createError(400, 'Invalid phone number format'));

  try {
    const storedData = otpStore.get(phoneNumber);
    if (!storedData) return next(createError(400, 'OTP not found. Please request a new one.'));
    if (storedData.expiry < Date.now()) return next(createError(400, 'OTP has expired. Please request a new one.'));
    if (storedData.otp !== otp) return next(createError(400, 'Incorrect OTP. Please try again.'));

    otpStore.delete(phoneNumber); // OTP used up

    const user = await User.findOne({ phoneNumber });

    if (user) {
      user.isVerified = true;
      await user.save();
      const token = user.generateAuthToken ? user.generateAuthToken() : null;

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          isVerified: user.isVerified
        },
        token
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'OTP verified, but no user found for this phone number',
        userExists: false
      });
    }
  } catch (err) {
    console.error('Error in verify-otp route:', err);
    return next(createError(500, 'Something went wrong while verifying OTP'));
  }
});


module.exports = router;