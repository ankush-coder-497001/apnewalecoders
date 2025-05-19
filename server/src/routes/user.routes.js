const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const Auth = require('../middleware/AuthMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.Login);
router.get('/getAllBookings', Auth, UserController.GetAllBookings)


module.exports = router;