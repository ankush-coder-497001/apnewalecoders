import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon, CalendarIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { GetAllBookings } from '../services/user.services';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    joinedDate: 'May 2023'
  });

  useEffect(() => {
    const UserData = JSON.parse(localStorage.getItem('user'));
    setUser(UserData)
  }, [])

  useEffect(() => {
    GetAllBookings().then((res) => {
      const updatedBookingData = res.Bookings.map((item) => {
        return {
          id: item.payment.orderId,
          dateTime: `${new Date(item.date)} ${item.time}`,
          status: item.status,
          payment: item.payment.amount
        }
      })
      setBookings(updatedBookingData)
    }).catch((e) => {
      toast.error(e.message)
    })
  }, [])


  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${activeTab === 'profile'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm inline-flex items-center`}
            >
              <UserCircleIcon className="h-5 w-5 mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`${activeTab === 'bookings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm inline-flex items-center`}
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              My Bookings
            </button>
          </nav>
        </div>

        {/* Profile Section */}
        {activeTab === 'profile' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex sm:space-x-4">
                  <div className="mb-4 flex-shrink-0 sm:mb-0">
                    <div className="relative h-24 w-24">
                      <UserCircleIcon className="h-24 w-24 text-gray-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">Joined {user.joinedDate}</p>
                  </div>
                </div>

              </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Section */}
        {activeTab === 'bookings' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h3 className="text-xl font-semibold text-gray-900">My Bookings</h3>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all your booked services and their current status.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <div className="overflow-auto border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200  ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                            No bookings found. <Link to="/slot-booking" className="text-indigo-600 hover:text-indigo-900">Book a slot</Link>
                          </td>
                        </tr>
                      ) : (
                        bookings.map((booking) => (
                          <tr key={booking?._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {booking?.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {booking?.dateTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {booking?.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {booking?.payment}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
