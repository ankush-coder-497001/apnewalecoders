const Razorpay = require('razorpay');
const Booking = require('../models/booking.model');
const crypto = require('crypto');
const { ConfirmPayment } = require('../services/email.svc');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// console.log(process.env.RAZORPAY_KEY_ID)
// console.log(process.env.RAZORPAY_KEY_SECRET)

// Create Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Could not create order',
    });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking_details
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
    }

    // Create booking
    const booking = new Booking({
      userId: req.user.userId, // Assuming you have authentication middleware
      ...booking_details,
      payment: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        amount: booking_details.amount,
        status: 'completed'
      },
      status: 'confirmed'
    });

    await booking.save();
    await ConfirmPayment(booking_details.email, booking_details.name, booking_details.amount, razorpay_order_id,)
    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Could not verify payment',
    });
  }
};
