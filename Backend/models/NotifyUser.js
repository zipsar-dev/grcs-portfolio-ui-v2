const mongoose = require('mongoose');

const NotifyUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  notificationPreferences: {
    newProduct: { type: Boolean, default: true },
    discount: { type: Boolean, default: true },
    restock: { type: Boolean, default: true },
    orderUpdate: { type: Boolean, default: true }
  },
  otpCode: { type: String },
  otpVerified: { type: Boolean, default: false },
  otpExpiresAt: { type: Date },
  otpAttempts: { type: Number, default: 0 },
  lastOtpSentAt: { type: Date },
  isActive: { type: Boolean, default: true },
  categories: [{ type: String }], // Product categories they're interested in
  priceRange: {
    min: { type: Number },
    max: { type: Number }
  }
}, {
  timestamps: true
});

// Index for better query performance
NotifyUserSchema.index({ phoneNumber: 1 });
NotifyUserSchema.index({ email: 1 });
NotifyUserSchema.index({ otpExpiresAt: 1 });

module.exports = mongoose.model('NotifyUser', NotifyUserSchema);