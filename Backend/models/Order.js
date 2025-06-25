const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true, default: 'US' }
    }
  },
  items: [{
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true }
  }],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery','online'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid', 'failed', 'refunded'],
    default: 'unpaid'
  },
  transactionId: { type: String },
  invoiceId: { type: String },
  subtotal: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  shippingCharges: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  notes: { type: String },
  trackingNumber: { type: String },
  estimatedDelivery: { type: Date },
  actualDelivery: { type: Date }
}, {
  timestamps: true
});

// Calculate totals before saving
OrderSchema.pre('save', function(next) {
  // Calculate item subtotals
  this.items.forEach(item => {
    item.subtotal = item.price * item.quantity;
  });
  
  // Calculate order subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  
  // Calculate total amount
  this.totalAmount = this.subtotal + this.taxAmount + this.shippingCharges - this.discountAmount;
  
  next();
});

// Index for better query performance
OrderSchema.index({ orderId: 1 });
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);