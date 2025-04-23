const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const journalController = require('../controllers/journalController');
const auth = require('../middleware/auth');

// Kõik päeviku marsruudid on kaitstud
router.use(auth);

// Päeviku sisestamise marsruudid
//router.post('/entries', journalController.createOrUpdateEntry);
router.get('/entries/date/:date', journalController.getEntryByDate);
router.get('/entries', journalController.getRecentEntries);
router.get('/stats/:year/:month', journalController.getMonthlyStats);
router.post('/entries', [
  body('mood_rating')
    .isInt({ min: 1, max: 10 })
    .withMessage('Meeleolu hinnang peab olema 1-10'),
  body('sleep_quality')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Une kvaliteet peab olema 1-10'),
  body('date')
    .isDate()
    .withMessage('Kuupäev peab olema vormingus YYYY-MM-DD')
], journalController.createOrUpdateEntry);

module.exports = router;