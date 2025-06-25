const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const ActivityLog = require('../models/ActivityLog');
const logger = require('../utils/logger');

const router = express.Router();

// Create new order
router.post('/', [
  body('customer.name').notEmpty().withMessage('Customer name is required'),
  body('customer.email').isEmail().withMessage('Valid email is required'),
  body('customer.phone').notEmpty().withMessage('Phone number is required'),
  body('customer.address.street').notEmpty().withMessage('Street address is required'),
  body('customer.address.city').notEmpty().withMessage('City is required'),
  body('customer.address.state').notEmpty().withMessage('State is required'),
  body('customer.address.zipCode').notEmpty().withMessage('Zip code is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productName').notEmpty().withMessage('Product name is required'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Valid quantity is required'),
  body('paymentMethod').isIn(['online', 'cash_on_delivery']).withMessage('Valid payment method is required')
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

    const order = new Order(req.body);
    await order.save();

    // Log activity
    await ActivityLog.create({
      action: 'order_placed',
      description: `Order ${order.orderId} placed by ${order.customer.name}`,
      metadata: {
        orderId: order.orderId,
        totalAmount: order.totalAmount,
        customerEmail: order.customer.email
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    logger.info(`Order created: ${order.orderId}`);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    logger.error(`Error creating order: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

// Get all orders with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;
    if (req.query.customerEmail) filter['customer.email'] = req.query.customerEmail;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error(`Error fetching orders: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    logger.error(`Error fetching order: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});

// Update order status
router.patch('/:orderId/status', [
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Valid status is required')
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

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: req.body.status, ...(req.body.trackingNumber && { trackingNumber: req.body.trackingNumber }) },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Log activity
    await ActivityLog.create({
      action: 'order_updated',
      description: `Order ${order.orderId} status updated to ${req.body.status}`,
      metadata: {
        orderId: order.orderId,
        oldStatus: order.status,
        newStatus: req.body.status
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    logger.info(`Order ${order.orderId} status updated to ${req.body.status}`);

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    logger.error(`Error updating order status: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
});

// Get orders by phone
router.get('/phone/:phone', async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.phone': req.params.phone })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    logger.error(`Error fetching orders by phone: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders by phone',
      error: error.message
    });
  }
});

module.exports = router;