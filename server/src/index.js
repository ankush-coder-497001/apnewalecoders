require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//middlewares
const ORIGIN = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: ORIGIN,
  credentials: true
}));
app.use(express.json());

//db connection
const mongoose = require('mongoose');
const url = process.env.Mongo_URL
mongoose.connect(url).then(() => {
  console.log('mongodb connect bro!')
}).catch((e) => {
  console.log(`mongoose connection error ${e}`)
})


// Routes
const paymentRoutes = require('./routes/payment.routes');
const userRoutes = require('./routes/user.routes');
app.use('/api/payments', paymentRoutes);
app.use('/api/user', userRoutes)



//start the server
const PORT = process.env.PORT || 7001
app.listen(PORT, () => {
  console.log(`server is running on port no ${PORT}`);
})