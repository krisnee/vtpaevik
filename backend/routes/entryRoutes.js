const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const entryController = require('../controllers/entryController');
//const { authenticateUser } = require('../middleware/auth');

// Kõik marsruudid on kaitstud autentimisega
//router.use(authenticateUser);

// // Kõigi sissekannete hankimine
// router.get('/', entryController.getAllEntries);

// // Ühe sissekande hankimine ID järgi
// router.get('/:id', entryController.getEntryById);

// // Uue sissekande loomine
// router.post('/', entryController.createEntry);

// // Olemasoleva sissekande uuendamine
// router.put('/:id', entryController.updateEntry);

// // Sissekande kustutamine
// router.delete('/:id', entryController.deleteEntry);

router.post('/entries', [
  body('mood_rating')
    .isInt({ min: 1, max: 10 })
    .withMessage('Meeleolu hinnang peab olema 1 kuni 10'),
  body('sleep_quality')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Une kvaliteet peab olema 1 kuni 10'),
  body('date')
    .isDate()
    .withMessage('Kuupäev peab olema vormingus YYYY-MM-DD')
], entryController.createOrUpdateEntry);

// router.get('/entries/date/:date', entryController.getEntryByDate);
// router.get('/entries', entryController.getRecentEntries);
// router.get('/stats/:year/:month', entryController.getMonthlyStats);

module.exports = router;