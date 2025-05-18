import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import StepProgress from '../components/StepProgress';

const steps = [
  { name: 'Personal Info', status: 'complete' },
  { name: 'Date & Time', status: 'complete' },
  { name: 'Payment', status: 'complete' },
  { name: 'Confirmation', status: 'current' },
];

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bookingDetails = state?.bookingDetails;

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/slot-booking');
    }
  }, [bookingDetails, navigate]);
  if (!bookingDetails) return null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <StepProgress steps={steps} />
        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">          <div className="text-center mb-8">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <h3 className="mt-2 text-xl font-semibold text-gray-700">Booking Confirmed</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your payment has been processed and your appointment has been successfully booked.
            Check your email for more details.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-green-600">Payment Confirmed ₹500</span>
          </div>
        </div>

          <div className="border-t border-gray-200 pt-8">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Booking ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {bookingDetails.bookingId || 'N/A'}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {bookingDetails.name}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {bookingDetails.email}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {bookingDetails.phone}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {bookingDetails.date}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {bookingDetails.time}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                <dd className="mt-1 text-sm text-green-600 font-medium sm:col-span-2 sm:mt-0">
                  Paid Successfully
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {bookingDetails.transactionId || 'N/A'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/slot-booking')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Book Another Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
