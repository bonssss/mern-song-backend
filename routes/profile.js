// routes/profile.js (or any other route file)

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Route that requires authentication
router.get('/profile', authenticate, (req, res) => {
    // This route will only be accessible if the user is authenticated
    res.json({ message: 'Protected route accessed successfully', user: req.user });
});

module.exports = router;
