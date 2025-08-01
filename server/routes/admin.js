const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require admin role
router.use(protect);
router.use(authorize('admin'));

// Placeholder routes - will be implemented later
router.get('/dashboard', (req, res) => {
  res.json({ success: true, message: 'Admin dashboard route working', data: {} });
});

router.get('/users', (req, res) => {
  res.json({ success: true, message: 'Admin users route working', data: [] });
});

router.get('/analytics', (req, res) => {
  res.json({ success: true, message: 'Admin analytics route working', data: {} });
});

module.exports = router;
