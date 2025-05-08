// ----------------------
// KASUTAJA MARSRUUDID (USER ROUTES)
// ----------------------
// Marsruudid kasutaja profiili vaatamiseks ja haldamiseks
// ----------------------

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// KASUTAJA MARSRUUDID
// -------------------

// Kasutaja profiili päring
router.get('/me', auth, userController.getProfile);

// Siia võid lisada teisi kasutajaga seotud marsruute, näiteks:
// router.put('/update', auth, userController.updateProfile);
// router.delete('/delete', auth, userController.deleteAccount);

module.exports = router;