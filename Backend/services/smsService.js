const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.PAY4SMS_BASE_URL || "https://pay4sms.in/sendsms/";

/**
 * Sends an SMS message using the Pay4SMS service
 * 
 * @param {Object} options - SMS options
 * @param {string} options.phoneNumber - Recipient's phone number
 * @param {string} options.message - SMS content
 * @param {string} options.templateId - Template ID required by Pay4SMS
 * @param {number} [options.credit=2] - SMS credit to use (default: 2)
 * @returns {Promise<Object>} Response from Pay4SMS API
 * @throws {Error} If validation fails or API request fails
 */
async function sendSMS({ phoneNumber, message, templateId, credit = 2 }) {
  // Validate required parameters
  if (!phoneNumber) throw new Error("Phone number is required");
  if (!message) throw new Error("Message content is required");
  if (!templateId) throw new Error("Template ID is required");

  // Check environment variables
  const token = process.env.PAY4SMS_TOKEN;
  const sender = process.env.PAY4SMS_SENDER;

  if (!token) throw new Error("PAY4SMS_TOKEN environment variable is missing");
  if (!sender) throw new Error("PAY4SMS_SENDER environment variable is missing");

  // Build URL with parameters
  const url = `${BASE_URL}?token=${token}` +
    `&credit=${credit}` +
    `&sender=${sender}` +
    `&message=${encodeURIComponent(message)}` +
    `&number=${encodeURIComponent(phoneNumber)}` +
    `&templateid=${templateId}`;

  try {
    // Log the request URL (excluding token for security)
    const logUrl = url.replace(token, "REDACTED");

    const response = await axios({
      method: 'get',
      url: url,
      timeout: 10000,
      validateStatus: null // Accept all status codes to handle them manually
    });

    console.log(`SMS API response status`);

    // Pay4SMS might return success with status 200 but indicate failure in the response body
    if (response.status !== 200) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Parse the response which looks like [ [ 'phoneNumber', 'messageId', 'status', statusCode ] ]
    if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
      const [recipientNumber, messageId, status, statusCode] = response.data[0];
      
      const result = {
        success: status.toLowerCase() === 'sent',
        phoneNumber: recipientNumber,
        messageId,
        status,
        statusCode
      };
      

      return result;
    }

    // Fallback for unexpected response format
    if (typeof response.data === 'string' && response.data.toLowerCase().includes('error')) {
      throw new Error(`Provider error: ${response.data}`);
    }

    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data || err.message || 'Unknown error';
    const statusCode = err.response?.status || 'Request failed';

    console.error(`SMS sending failed: ${statusCode} - ${errorMessage}`);
    console.error(err);

    throw new Error(`Failed to send SMS: ${errorMessage}`);
  }
}

module.exports = { sendSMS };
