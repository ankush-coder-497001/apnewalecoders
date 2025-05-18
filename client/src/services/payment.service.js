import axios from 'axios';

const API_URL = 'http://localhost:7000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const createOrder = async (amount) => {
  try {
    const response = await api.post('/payments/create-order', { amount });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyPayment = async (paymentData, bookingDetails) => {
  try {
    const response = await api.post('/payments/verify-payment', {
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_signature: paymentData.razorpay_signature,
      booking_details: bookingDetails,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
