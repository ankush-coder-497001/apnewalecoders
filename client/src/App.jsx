import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import SlotBooking from './pages/SlotBooking';
import DateTime from './pages/DateTime';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';
import './App.css';
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/protectedRoute'
function App() {
  return (
    <>

      <Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>


          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<MainLayout />}>
            <Route path="/slot-booking" element={
              <ProtectedRoute>
                <SlotBooking />
              </ProtectedRoute>
            } />
            <Route path="/date-time" element={
              <ProtectedRoute>
                <DateTime />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } />
            <Route path="/booking-confirmation" element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
