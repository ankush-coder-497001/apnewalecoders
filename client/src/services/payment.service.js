import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:7000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const createOrder = async (amount) => {
  const token = localStorage.getItem('Apne-wale-coders-token')
  try {
    const response = await api.post('/payments/create-order', { amount },
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyPayment = async (paymentData, bookingDetails) => {
  const token = localStorage.getItem('Apne-wale-coders-token')
  try {
    const response = await api.post('/payments/verify-payment', {
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_signature: paymentData.razorpay_signature,
      booking_details: bookingDetails,
    }, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
