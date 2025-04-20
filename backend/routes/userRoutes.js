const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.get('/me', auth, (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not logged in' });

  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
});

module.exports = router;