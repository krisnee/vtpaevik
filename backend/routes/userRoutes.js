const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutit
  max: 5 // maksimaalselt 5 katset
});

// Avalikud marsruudid
router.post('/register', async (req, res, next) => {
  try {
    await userController.register(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    await userController.login(req, res);
  } catch (error) {
    next(error);
  }
});

// Kaitstud marsruudid
router.get('/me', auth, userController.getProfile);

module.exports = router;