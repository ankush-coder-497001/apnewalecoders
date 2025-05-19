import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
const Navbar = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const handleLogout = () => {
    localStorage.removeItem('Apne-wale-coders-token');
    localStorage.removeItem('user');
    navigate('/login')
  }
  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="md:text-2xl text-sm font-bold text-indigo-600">ApneWaleCoders</h1>
              </div>
              {isMobile ? (
                <>
                  <div className="md:hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/dashboard"
                      className="border-indigo-500  hover:border-gray-300  text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/slot-booking"
                      className="border-indigo-500 text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Book New Slot
                    </Link>
                  </div>
                </>
              ) : (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/dashboard"
                    className="border-indigo-500  hover:border-gray-300  text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/slot-booking"
                    className="border-indigo-500 text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Book New Slot
                  </Link>
                </div>
              )
              }

            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md  hover:bg-red-700 focus:outline-none bg-red-500 cursor-pointer text-stone-50 "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar;