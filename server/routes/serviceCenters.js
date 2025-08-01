const express = require('express');
const { protect, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'Service centers route working', data: [] });
});

router.post('/', protect, (req, res) => {
  res.json({ success: true, message: 'Create service center route working' });
});

router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'Get service center by ID route working' });
});

module.exports = router;
