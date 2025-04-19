const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const auth = require('../middleware/auth');

// Kõik päeviku marsruudid on kaitstud
router.use(auth);

// Päeviku sisestamise marsruudid
router.post('/entries', journalController.createOrUpdateEntry);
router.get('/entries/date/:date', journalController.getEntryByDate);
router.get('/entries', journalController.getRecentEntries);
router.get('/stats/:year/:month', journalController.getMonthlyStats);

module.exports = router;