const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bookingModel = require('../models/booking.model');
const UserController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    // Validation check
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const isUser = await UserModel.findOne({ email });

      if (isUser) {
        return res.status(409).json({ message: 'User already registered' });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
      });

      if (!user) {
        return res.status(500).json({ message: 'User not created' });
      }

      return res.status(201).json({
        message: 'Registered successfully',
        user
      });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  Login: async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare password
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(401).json({ message: 'Password is incorrect' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Optional: Exclude password before sending user info
      const { password: _, ...userData } = user._doc;

      return res.status(200).json({
        message: 'User login successful',
        token,
        user: userData
      });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  GetAllBookings: async (req, res) => {
    const { userId } = req.user;
    try {
      const Bookings = await bookingModel.find({ userId });
      if (!Bookings) {
        return res.status(404).json({ message: 'No Bookings Found' })
      }
      return res.status(200).json({ message: 'Bookings Found !', Bookings });
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

}

module.exports = UserController