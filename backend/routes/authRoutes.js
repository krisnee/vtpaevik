// ----------------------
// AUTENTIMISE MARSRUUDID (AUTH ROUTES)
// ----------------------
// Marsruudid kasutaja registreerimiseks ja sisselogimiseks
// ----------------------

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

// Sisselogimisele piirangute seadmine (DoS rünnakute vältimiseks)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutit
  max: 5, // maksimaalselt 5 katset ajaakna kohta
  message: { message: 'Liiga palju sisselogimiskatseid, proovige hiljem uuesti' }
});

// AUTENTIMISE MARSRUUDID
// ----------------------

// Registreerimine
router.post('/register', async (req, res, next) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    next(error);
  }
});

// Sisselogimine (koos piirangutega)
router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;