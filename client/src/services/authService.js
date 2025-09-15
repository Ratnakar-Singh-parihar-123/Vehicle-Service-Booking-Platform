import { apiMethods } from './api.js';

export const authService = {
  // Register new user
  register: (userData) => apiMethods.post('/auth/register', userData),

  // Login user
  login: (credentials) => apiMethods.post('/auth/login', credentials),

  // Logout user
  logout: () => apiMethods.post('/auth/logout'),

  // Get current user profile
  getProfile: () => apiMethods.get('/auth/me'),

  // Update user profile (demo only, localStorage based)
  updateProfile: (profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const authData = JSON.parse(localStorage.getItem('auth') || '{}');
        const currentUser = authData.user || {};
        const updatedUser = {
          ...currentUser,
          ...profileData,
          updatedAt: new Date().toISOString(),
        };

        resolve({
          data: {
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser,
          },
        });
      }, 1000); // Simulated network delay
    });
  },

  // Change password
  changePassword: (passwordData) =>
    apiMethods.put('/auth/change-password', passwordData),

  // Request password reset
  requestPasswordReset: (email) =>
    apiMethods.post('/auth/forgot-password', { email }),

  // Reset password
  resetPassword: (token, newPassword) =>
    apiMethods.post('/auth/reset-password', { token, password: newPassword }),

  // Validate reset token
  validateResetToken: (token, email) =>
    apiMethods.post('/auth/validate-reset-token', { token, email }),

  // Verify email
  verifyEmail: (token) => apiMethods.post('/auth/verify-email', { token }),

  // Resend verification email
  resendVerification: () => apiMethods.post('/auth/resend-verification'),
};