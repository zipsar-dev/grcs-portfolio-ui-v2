/**
 * Generate a random OTP code
 * @param {number} length - Length of OTP (default: 4)
 * @returns {string} - Generated OTP code
 */
const generateOTP = (length = 4) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  
  return otp;
};

/**
 * Generate a secure random OTP using crypto
 * @param {number} length - Length of OTP (default: 4)
 * @returns {string} - Generated OTP code
 */
const generateSecureOTP = (length = 4) => {
  const crypto = require('crypto');
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits[randomIndex];
  }
  
  return otp;
};

/**
 * Generate alphanumeric OTP
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} - Generated alphanumeric OTP code
 */
const generateAlphanumericOTP = (length = 6) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  
  return otp;
};

module.exports = {
  generateOTP,
  generateSecureOTP,
  generateAlphanumericOTP
};