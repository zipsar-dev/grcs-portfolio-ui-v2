const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const logger = require('../utils/logger');

const router = express.Router();

// Register new user
router.post('/register', [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('dateOfBirth').optional().isISO8601().withMessage('Valid date of birth is required'),
  body('gender').optional().isIn(['male', 'female', 'other', 'prefer_not_to_say']).withMessage('Valid gender is required'),
  body('purpose').optional().isIn(['Full_time_work',
    'Part_time_work',
    'only_to_purchase_products',
    'company_benefits',
    'others']).withMessage('Valid purpose is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { fullName, email, phoneNumber, password, dateOfBirth, gender, occupation, location, purpose, referredBy } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone number'
      });
    }

    // Handle referral
    let referrer = null;
    if (referredBy) {
      referrer = await User.findOne({ referralCode: referredBy });
      if (referrer) {
        referrer.rewardPoints += 100; // Award points for successful referral
        await referrer.save();
      }
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      phoneNumber,
      password,
      dateOfBirth,
      gender,
      occupation,
      location,
      purpose,
      referredBy: referrer ? referrer._id : null,
      rewardPoints: referrer ? 50 : 0 // New user gets points if referred
    });

    await user.save();

    // Log activity
    await ActivityLog.create({
      userId: user._id,
      action: 'user_registered',
      description: `User ${fullName} registered successfully`,
      metadata: {
        email,
        phoneNumber,
        referredBy: referrer ? referrer.referralCode : null
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    logger.info(`User registered: ${email}`);

    // No token generation here as per request
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          referralCode: user.referralCode,
          rewardPoints: user.rewardPoints,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified
        },
        token
      }
    });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('referredBy', 'fullName email referralCode');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get referral stats
    const referralCount = await User.countDocuments({ referredBy: user._id });

    res.json({
      success: true,
      data: {
        ...user.toObject(),
        referralStats: {
          totalReferrals: referralCount,
          totalRewardPoints: user.rewardPoints
        }
      }
    });
  } catch (error) {
    logger.error(`Error fetching user profile: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile/:userId', [
  body('fullName').optional().notEmpty().withMessage('Full name cannot be empty'),
  body('phoneNumber').optional().notEmpty().withMessage('Phone number cannot be empty'),
  body('dateOfBirth').optional().isISO8601().withMessage('Valid date of birth is required'),
  body('gender').optional().isIn(['male', 'female', 'other', 'prefer_not_to_say']).withMessage('Valid gender is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { fullName, phoneNumber, dateOfBirth, gender, occupation, location, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        ...(fullName && { fullName }),
        ...(phoneNumber && { phoneNumber }),
        ...(dateOfBirth && { dateOfBirth }),
        ...(gender && { gender }),
        ...(occupation && { occupation }),
        ...(location && { location }),
        ...(preferences && { preferences })
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Log activity
    await ActivityLog.create({
      userId: user._id,
      action: 'profile_updated',
      description: `Profile updated for ${user.fullName}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    logger.info(`User profile updated: ${user.email}`);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    logger.error(`Error updating user profile: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

module.exports = router;