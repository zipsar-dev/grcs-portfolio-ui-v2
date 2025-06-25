const express = require('express');
const { body, validationResult } = require('express-validator');
const NotifyUser = require('../models/NotifyUser');
const ActivityLog = require('../models/ActivityLog');
const { sendSMS } = require('../services/smsService');
const logger = require('../utils/logger');

const router = express.Router();

// Register for notifications`
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('phoneNumber').isMobilePhone().withMessage('Valid phone number is required'),
  body('email').optional().isEmail().withMessage('Valid email is required if provided')
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

    const { name, phoneNumber, email, notificationPreferences, categories, priceRange } = req.body;

    // Check if user already exists
    let user = await NotifyUser.findOne({ phoneNumber });
    
    if (user) {
      // Update existing user
      user.name = name;
      if (email) user.email = email;
      if (notificationPreferences) user.notificationPreferences = { ...user.notificationPreferences, ...notificationPreferences };
      if (categories) user.categories = categories;
      if (priceRange) user.priceRange = priceRange;
      await user.save();
    } else {
      // Create new user
      user = new NotifyUser({
        name,
        phoneNumber,
        email,
        notificationPreferences,
        categories,
        priceRange
      });
      await user.save();
    }

    // Log activity
    await ActivityLog.create({
      action: 'user_registered',
      description: `User ${name} registered for notifications`,
      metadata: {
        phoneNumber,
        email,
        notificationPreferences
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    logger.info(`Notification user registered: ${phoneNumber}`);

    res.status(201).json({
      success: true,
      message: 'Successfully registered for notifications',
      data: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        notificationPreferences: user.notificationPreferences
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Phone number already registered'
      });
    }
    
    logger.error(`Error registering notification user: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error registering for notifications',
      error: error.message
    });
  }
});

// Get notification preferences
router.get('/preferences/:phoneNumber', async (req, res) => {
  try {
    const user = await NotifyUser.findOne({ phoneNumber: req.params.phoneNumber });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        notificationPreferences: user.notificationPreferences,
        categories: user.categories,
        priceRange: user.priceRange,
        isVerified: user.otpVerified
      }
    });
  } catch (error) {
    logger.error(`Error fetching notification preferences: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching preferences',
      error: error.message
    });
  }
});

// Update notification preferences
router.put('/preferences/:phoneNumber', [
  body('notificationPreferences').optional().isObject().withMessage('Notification preferences must be an object')
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

    const { notificationPreferences, categories, priceRange } = req.body;

    const user = await NotifyUser.findOneAndUpdate(
      { phoneNumber: req.params.phoneNumber },
      { 
        ...(notificationPreferences && { notificationPreferences }),
        ...(categories && { categories }),
        ...(priceRange && { priceRange })
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: {
        notificationPreferences: user.notificationPreferences,
        categories: user.categories,
        priceRange: user.priceRange
      }
    });
  } catch (error) {
    logger.error(`Error updating notification preferences: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error updating preferences',
      error: error.message
    });
  }
});

// Get all notification users (admin endpoint)
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.verified === 'true') filter.otpVerified = true;
    if (req.query.verified === 'false') filter.otpVerified = false;
    if (req.query.active === 'true') filter.isActive = true;
    if (req.query.active === 'false') filter.isActive = false;

    const users = await NotifyUser.find(filter)
      .select('-otpCode')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await NotifyUser.countDocuments(filter);

    res.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error(`Error fetching notification users: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

module.exports = router;