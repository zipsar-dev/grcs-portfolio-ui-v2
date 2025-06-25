const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer_not_to_say']
  },
  occupation: {
    type: String,
    trim: true
  },
  location: {
    city: { type: String }
  },
  purpose: {
    type: String,
    enum: [
      'Full_time_work',
      'Part_time_work',
      'Only_to_purchase_products',
      'Company_benefits',
      'Others'
    ],
    default: 'Full_time_work'
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Generate referral code before saving
UserSchema.pre('save', async function(next) {
  if (!this.referralCode) {
    this.referralCode = `REF-${this.fullName.replace(/\s+/g, '').toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`;
  }
  
  // Hash password if it's modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Index for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ phoneNumber: 1 });
UserSchema.index({ referralCode: 1 });
UserSchema.index({ referredBy: 1 });

module.exports = mongoose.model('User', UserSchema);