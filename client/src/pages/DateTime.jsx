import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepProgress from '../components/StepProgress';

const steps = [
  { name: 'Personal Info', status: 'complete' },
  { name: 'Date & Time', status: 'current' },
  { name: 'Payment', status: 'upcoming' },
  { name: 'Confirmation', status: 'upcoming' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM'
];

const DateTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const details = location.state?.userDetails;
    if (!details) {
      navigate('/slot-booking');
      return;
    }
    setUserDetails(details);
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', {
      state: {
        userDetails,
        dateTime: {
          date: selectedDate,
          time: selectedTime
        }
      }
    });
  };

  // Get minimum date (today) and maximum date (30 days from today)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <StepProgress steps={steps} currentStep={1} />

        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                min={today}
                max={maxDateStr}
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 text-sm font-medium rounded-md ${selectedTime === time
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => navigate('/slot-booking')}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!selectedDate || !selectedTime}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next: Payment Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
