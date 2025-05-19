import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import SlotBooking from './pages/SlotBooking';
import DateTime from './pages/DateTime';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';
import Dashboard from './pages/Dashboard';
import './App.css';
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/protectedRoute'
import Navbar from './components/navbar';
import { useEffect, useState } from 'react';
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
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
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
