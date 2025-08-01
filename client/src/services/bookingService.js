import { apiMethods } from './api';

export const bookingService = {
  // Create a new booking
  createBooking: (bookingData) => {
    return apiMethods.post('/bookings', bookingData);
  },

  // Get user's bookings
  getUserBookings: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiMethods.get(`/bookings${queryString ? `?${queryString}` : ''}`);
  },

  // Get booking by ID
  getBookingById: (id) => {
    return apiMethods.get(`/bookings/${id}`);
  },

  // Update booking
  updateBooking: (id, updateData) => {
    return apiMethods.put(`/bookings/${id}`, updateData);
  },

  // Cancel booking
  cancelBooking: (id, reason) => {
    return apiMethods.patch(`/bookings/${id}/cancel`, { reason });
  },

  // Get available time slots
  getAvailableTimeSlots: (date, serviceCenterId) => {
    return apiMethods.get(`/bookings/available-slots?date=${date}&serviceCenterId=${serviceCenterId}`);
  },

  // Get service centers
  getServiceCenters: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiMethods.get(`/service-centers${queryString ? `?${queryString}` : ''}`);
  },

  // Get services
  getServices: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiMethods.get(`/services${queryString ? `?${queryString}` : ''}`);
  }
};
