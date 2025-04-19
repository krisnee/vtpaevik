const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Avalikud marsruudid
router.post('/register', userController.register);
router.post('/login', userController.login);

// Kaitstud marsruudid
router.get('/me', auth, userController.getProfile);

module.exports = router;