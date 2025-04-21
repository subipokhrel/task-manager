// Import
const express = require('express');
// Create a router instance
const router = express.Router();
// Import the controller functions for auth
const { register, login } = require('../controllers/authController');

// Import auth middleware
const authMiddleware = require('../middleware/authMiddleware');

// Define POST /register route that uses the register controller
router.post('/register', register);
// Define POST /login route that uses the login controller
router.post('/login', login);
//for logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false,
  });
  res.status(200).json({ message: 'Logout successful' });
});
// Token verification route
router.get('/api/verify', authMiddleware, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});
// Export the router so it can be used in index.js
module.exports = router;
