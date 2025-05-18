const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const Auth = require('../middleware/AuthMiddleware')

router.post('/create-order', Auth, paymentController.createOrder);
router.post('/verify-payment', Auth, paymentController.verifyPayment);

module.exports = router;
