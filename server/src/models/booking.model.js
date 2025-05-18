const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  resumeUrl: {
    type: String,
    required: true
  },
  payment: {
    orderId: String,
    paymentId: String,
    signature: String,
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
