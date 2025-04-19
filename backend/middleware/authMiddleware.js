// Import the JWT library for token verification
const jwt = require('jsonwebtoken');
// Import the User model to fetch user details from DB
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.token;

    // If no token is present, block access
    if (!token) {
      console.log("No token found in cookies"); //for debugging
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on decoded token's ID
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (err) {
    console.log("JWT error:", err.message); //debugging
    // If anything fails (invalid token, user not found), return 401
    res.status(401).json({ message: 'Unauthorized' });
  }
};
