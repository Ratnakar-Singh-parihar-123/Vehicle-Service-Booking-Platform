import { apiMethods } from './api.js';

export const authService = {
  // Register new user
  register: (userData) => {
    return apiMethods.post('/auth/register', userData);
  },

  // Login user
  login: (credentials) => {
    return apiMethods.post('/auth/login', credentials);
  },

  // Logout user
  logout: () => {
    return apiMethods.post('/auth/logout');
  },

  // Get current user profile
  getProfile: () => {
    return apiMethods.get('/auth/me');
  },

  // Update user profile
  updateProfile: (profileData) => {
    // For demo purposes, simulate a successful API response
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get current user from localStorage
        const authData = JSON.parse(localStorage.getItem('auth') || '{}');
        const currentUser = authData.user || {};

        // Merge the profile data with current user
        const updatedUser = {
          ...currentUser,
          ...profileData,
          updatedAt: new Date().toISOString()
        };

        resolve({
          data: {
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
          }
        });
      }, 1000); // Simulate network delay
    });
  },

  // Change password
  changePassword: (passwordData) => {
    return apiMethods.put('api/auth/change-password', passwordData);
  },

  // Request password reset
  requestPasswordReset: (email) => {
    return apiMethods.post('api/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: (token, newPassword) => {
    return apiMethods.post('api/auth/reset-password', { token, password: newPassword });
  },

  // Validate reset token
  validateResetToken: (token, email) => {
    return apiMethods.post('api/auth/validate-reset-token', { token, email });
  },

  // Verify email
  verifyEmail: (token) => {
    return apiMethods.post('api/auth/verify-email', { token });
  },

  // Resend verification email
  resendVerification: () => {
    return apiMethods.post('api/auth/resend-verification');
  }
};
