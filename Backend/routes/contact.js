const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const ActivityLog = require('../models/ActivityLog');
const logger = require('../utils/logger');

const router = express.Router();

// Submit contact form
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required')
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

    const contact = new Contact({
      ...req.body,
      source: req.body.source || 'website'
    });

    await contact.save();

    // Log activity
    await ActivityLog.create({
      action: 'contact_submitted',
      description: `Contact form submitted by ${contact.name} (${contact.email})`,
      metadata: {
        contactId: contact._id,
        subject: contact.subject,
        email: contact.email
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    logger.info(`Contact form submitted: ${contact.email} - ${contact.subject}`);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    logger.error(`Error submitting contact form: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
});

// Get all contact messages (admin endpoint)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.email) filter.email = req.query.email;

    const contacts = await Contact.find(filter)
      .populate('assignedTo', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error(`Error fetching contact messages: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    });
  }
});

// Get contact message by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'fullName email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    logger.error(`Error fetching contact message: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message',
      error: error.message
    });
  }
});

// Update contact message status
router.patch('/:id/status', [
  body('status').isIn(['new', 'in_progress', 'resolved', 'closed']).withMessage('Valid status is required')
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

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        ...(req.body.response && { response: req.body.response, responseDate: new Date() }),
        ...(req.body.assignedTo && { assignedTo: req.body.assignedTo }),
        ...(req.body.priority && { priority: req.body.priority })
      },
      { new: true }
    ).populate('assignedTo', 'fullName email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    logger.info(`Contact message ${contact._id} status updated to ${req.body.status}`);

    res.json({
      success: true,
      message: 'Contact message updated successfully',
      data: contact
    });
  } catch (error) {
    logger.error(`Error updating contact message: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error updating contact message',
      error: error.message
    });
  }
});

module.exports = router;