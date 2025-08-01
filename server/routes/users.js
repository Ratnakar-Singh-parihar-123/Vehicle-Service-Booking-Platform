const express = require('express');
const { body } = require('express-validator');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUserDashboard,
  getUserStats
} = require('../controllers/userController');
const { protect, authorize, checkOwnership } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const updateUserValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['customer', 'service_center', 'admin'])
    .withMessage('Invalid role specified')
];

// Routes

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), getAllUsers);

// @desc    Get user profile (current user)
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @desc    Update user profile (current user)
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, updateUserValidation, updateUserProfile);

// @desc    Get dashboard data for current user
// @route   GET /api/users/dashboard
// @access  Private
router.get('/dashboard', protect, getUserDashboard);

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
router.get('/stats', protect, getUserStats);

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (own profile or admin)
router.get('/:id', protect, getUserById);

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (own profile or admin)
router.put('/:id', protect, updateUserValidation, updateUser);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
