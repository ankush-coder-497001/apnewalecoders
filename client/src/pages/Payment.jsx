import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import { createOrder, verifyPayment } from '../services/payment.service'
import toast from 'react-hot-toast';
const steps = [
  { name: 'Personal Info', status: 'complete' },
  { name: 'Date & Time', status: 'complete' },
  { name: 'Payment', status: 'current' },
  { name: 'Confirmation', status: 'upcoming' },
];

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false); const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    const userDetails = location.state?.userDetails;
    const dateTime = location.state?.dateTime;

    if (!userDetails || !dateTime) {
      navigate('/slot-booking');
      return;
    }

    setBookingDetails({
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      date: dateTime.date,
      time: dateTime.time,
    });
  }, [location.state, navigate]);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const amount = 500; // ₹500
      const { order } = await createOrder(amount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Apne Wale Coders',
        description: 'Slot Booking Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            const result = await verifyPayment(response, {
              ...bookingDetails,
              amount: amount
            });

            if (result.success) {
              navigate('/booking-confirmation', {
                state: {
                  bookingDetails: {
                    ...bookingDetails,
                    bookingId: result.booking._id,
                    transactionId: response.razorpay_payment_id,
                  },
                },
              });
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: bookingDetails.name,
          email: bookingDetails.email,
          contact: bookingDetails.phone,
        },
        theme: {
          color: '#4f46e5',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log('Payment initialization failed:', error);
      toast.error('Could not initialize payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <StepProgress steps={steps} currentStep={2} />

        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Name</dt>
                  <dd className="text-sm font-medium text-gray-900">{bookingDetails.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="text-sm font-medium text-gray-900">{bookingDetails.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Phone</dt>
                  <dd className="text-sm font-medium text-gray-900">{bookingDetails.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Date</dt>
                  <dd className="text-sm font-medium text-gray-900">{bookingDetails.date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Time</dt>
                  <dd className="text-sm font-medium text-gray-900">{bookingDetails.time}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                  <dt className="text-base font-medium text-gray-900">Booking Fee</dt>
                  <dd className="text-base font-medium text-gray-900">₹500</dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹500</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center">
                <img
                  src="https://razorpay.com/favicon.png"
                  alt="Razorpay"
                  className="h-8 w-8"
                />
                <span className="ml-2 text-sm text-gray-500">
                  Secure payments powered by Razorpay
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => navigate('/date-time')}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePayment}
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
