// Import
const express = require('express');
// Create a router instance
const router = express.Router();
// Import the controller functions for auth
const { register, login } = require('../controllers/authController');

// Define POST /register route that uses the register controller
router.post('/register', register);
// Define POST /login route that uses the login controller
router.post('/login', login);

// Export the router so it can be used in index.js
module.exports = router;
