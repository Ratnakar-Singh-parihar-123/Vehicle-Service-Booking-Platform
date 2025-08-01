import { apiMethods } from './api';

export const dashboardService = {
  // Get dashboard data for current user
  getDashboardData: () => {
    return apiMethods.get('/users/dashboard');
  },

  // Get user's recent bookings
  getRecentBookings: (limit = 5) => {
    return apiMethods.get(`/bookings?limit=${limit}&sort=-createdAt`);
  },

  // Get upcoming appointments
  getUpcomingAppointments: () => {
    return apiMethods.get('/bookings?status=confirmed,pending&sort=scheduledDateTime');
  },

  // Get user statistics
  getUserStats: () => {
    return apiMethods.get('/users/stats');
  },

  // Get quick actions based on user role
  getQuickActions: () => {
    return apiMethods.get('/users/quick-actions');
  }
};
