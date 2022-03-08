const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth');

// Helpers
const validation = require('../helpers/validation/user-form-validation');

// PUT
router.put('/signup', validation.email, validation.password, validation.name, authController.signup); // we can also use POST here

module.exports = router;
