import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiEye,
  FiX,
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiTruck,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiPhone,
  FiMail
} from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import { bookingService } from '../services/bookingService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MyBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  // Status options for filtering
  const statusOptions = [
    { value: 'all', label: 'All Bookings', count: 0 },
    { value: 'pending', label: 'Pending', count: 0 },
    { value: 'confirmed', label: 'Confirmed', count: 0 },
    { value: 'in_progress', label: 'In Progress', count: 0 },
    { value: 'completed', label: 'Completed', count: 0 },
    { value: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  // Fetch bookings
  const fetchBookings = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await bookingService.getUserBookings({
        limit: 50,
        sort: '-createdAt'
      });

      if (response.data.success) {
        setBookings(response.data.data || []);
        if (isRefresh) {
          toast.success('Bookings refreshed successfully');
        }
      } else {
        throw new Error(response.data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Fetch bookings error:', error);
      setError('Failed to load bookings');
      if (!isRefresh) {
        toast.error('Failed to load bookings');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Cancel booking
  const handleCancelBooking = async () => {
    if (!bookingToCancel || !cancelReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    try {
      setCancelling(true);

      const response = await bookingService.cancelBooking(bookingToCancel._id, cancelReason);

      if (response.data.success) {
        // Update booking status in local state
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking._id === bookingToCancel._id
              ? { ...booking, status: 'cancelled' }
              : booking
          )
        );

        toast.success('Booking cancelled successfully');
        setShowCancelModal(false);
        setBookingToCancel(null);
        setCancelReason('');
      } else {
        throw new Error(response.data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Cancel booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'text-warning-600 bg-warning-100 dark:bg-warning-900 dark:text-warning-200',
          icon: FiClock,
          label: 'Pending'
        };
      case 'confirmed':
        return {
          color: 'text-primary-600 bg-primary-100 dark:bg-primary-900 dark:text-primary-200',
          icon: FiCheckCircle,
          label: 'Confirmed'
        };
      case 'in_progress':
        return {
          color: 'text-secondary-600 bg-secondary-100 dark:bg-secondary-900 dark:text-secondary-200',
          icon: FiSettings,
          label: 'In Progress'
        };
      case 'completed':
        return {
          color: 'text-success-600 bg-success-100 dark:bg-success-900 dark:text-success-200',
          icon: FiCheckCircle,
          label: 'Completed'
        };
      case 'cancelled':
        return {
          color: 'text-danger-600 bg-danger-100 dark:bg-danger-900 dark:text-danger-200',
          icon: FiXCircle,
          label: 'Cancelled'
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200',
          icon: FiAlertCircle,
          label: 'Unknown'
        };
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  // Get service type label
  const getServiceTypeLabel = (serviceType) => {
    const serviceLabels = {
      'oil_change': 'Oil Change',
      'general_maintenance': 'General Maintenance',
      'ac_repair': 'AC Repair',
      'brake_service': 'Brake Service',
      'engine_repair': 'Engine Repair',
      'battery_service': 'Battery Service',
      'tire_service': 'Tire Service',
      'transmission_service': 'Transmission Service',
      'electrical_service': 'Electrical Service',
      'body_work': 'Body Work',
      'inspection': 'Vehicle Inspection',
      'emergency_service': 'Emergency Service'
    };
    return serviceLabels[serviceType] || serviceType;
  };

  // Filter bookings based on status and search term
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesSearch = searchTerm === '' ||
      booking.vehicle?.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicle?.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getServiceTypeLabel(booking.serviceType).toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Calculate status counts
  const statusCounts = statusOptions.map(option => ({
    ...option,
    count: option.value === 'all' ? bookings.length : bookings.filter(b => b.status === option.value).length
  }));

  // Check if booking can be cancelled
  const canCancelBooking = (booking) => {
    return ['pending', 'confirmed'].includes(booking.status);
  };

  // Load bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your bookings..." />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Bookings - Vehicle Service Booking</title>
        <meta name="description" content="View and manage your vehicle service bookings" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Bookings
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage your vehicle service appointments
                </p>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button
                  onClick={() => fetchBookings(true)}
                  disabled={refreshing}
                  className="btn-outline flex items-center"
                >
                  <FiRefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <Link
                  to="/book-service"
                  className="btn-primary flex items-center"
                >
                  <FiCalendar className="w-4 h-4 mr-2" />
                  Book New Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-danger-50 dark:bg-danger-900 border border-danger-200 dark:border-danger-700 rounded-md p-4">
              <div className="flex">
                <FiAlertCircle className="h-5 w-5 text-danger-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-danger-800 dark:text-danger-200">{error}</p>
                  <button
                    onClick={() => fetchBookings()}
                    className="mt-2 text-sm text-danger-600 dark:text-danger-400 hover:text-danger-500 underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {statusCounts.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === status.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {status.label}
                  {status.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      selectedStatus === status.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {status.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by vehicle, service, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const statusInfo = getStatusInfo(booking.status);
                const StatusIcon = statusInfo.icon;
                const dateTime = formatDateTime(booking.scheduledDateTime || booking.createdAt);

                return (
                  <div
                    key={booking._id}
                    className="card hover:shadow-medium transition-shadow duration-200"
                  >
                    <div className="card-body">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        {/* Booking Info */}
                        <div className="flex-1 space-y-3">
                          {/* Header Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                                <FiTruck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {booking.vehicle?.make} {booking.vehicle?.model} ({booking.vehicle?.year})
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Booking ID: {booking.bookingId}
                                </p>
                              </div>
                            </div>

                            <div className="mt-2 sm:mt-0">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                                <StatusIcon className="w-4 h-4 mr-1" />
                                {statusInfo.label}
                              </span>
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Service Type */}
                            <div className="flex items-center space-x-2">
                              <FiSettings className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {getServiceTypeLabel(booking.serviceType)}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Service</p>
                              </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center space-x-2">
                              <FiCalendar className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {dateTime.date}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Date</p>
                              </div>
                            </div>

                            {/* Time */}
                            <div className="flex items-center space-x-2">
                              <FiClock className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {dateTime.time}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Time</p>
                              </div>
                            </div>

                            {/* Service Center */}
                            <div className="flex items-center space-x-2">
                              <FiMapPin className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {booking.serviceCenter?.name || 'Service Center'}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Location</p>
                              </div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          {booking.totalAmount && (
                            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount:</span>
                              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                ${booking.totalAmount}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 lg:ml-6">
                          <Link
                            to={`/booking/${booking._id}`}
                            className="btn-outline flex items-center justify-center"
                          >
                            <FiEye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>

                          {canCancelBooking(booking) && (
                            <button
                              onClick={() => {
                                setBookingToCancel(booking);
                                setShowCancelModal(true);
                              }}
                              className="btn-danger flex items-center justify-center"
                            >
                              <FiX className="w-4 h-4 mr-2" />
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {selectedStatus === 'all' ? 'No bookings found' : `No ${selectedStatus} bookings`}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm
                  ? `No bookings match your search "${searchTerm}"`
                  : selectedStatus === 'all'
                    ? "You haven't made any service bookings yet."
                    : `You don't have any ${selectedStatus} bookings.`
                }
              </p>
              {selectedStatus === 'all' && !searchTerm && (
                <Link
                  to="/book-service"
                  className="btn-primary inline-flex items-center"
                >
                  <FiCalendar className="w-4 h-4 mr-2" />
                  Book Your First Service
                </Link>
              )}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn-outline inline-flex items-center"
                >
                  <FiX className="w-4 h-4 mr-2" />
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Cancel Booking Modal */}
        {showCancelModal && bookingToCancel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-danger-100 dark:bg-danger-900 rounded-lg flex items-center justify-center mr-3">
                  <FiX className="w-5 h-5 text-danger-600 dark:text-danger-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cancel Booking
                </h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Are you sure you want to cancel this booking?
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {bookingToCancel.vehicle?.make} {bookingToCancel.vehicle?.model}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getServiceTypeLabel(bookingToCancel.serviceType)} - {formatDateTime(bookingToCancel.scheduledDateTime).date}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="cancelReason" className="label">
                  Cancellation Reason *
                </label>
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Please provide a reason for cancellation..."
                  rows={3}
                  className="input w-full"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setBookingToCancel(null);
                    setCancelReason('');
                  }}
                  className="btn-outline flex-1"
                  disabled={cancelling}
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  disabled={cancelling || !cancelReason.trim()}
                  className="btn-danger flex-1 flex items-center justify-center"
                >
                  {cancelling ? (
                    <>
                      <LoadingSpinner size="sm" color="white" className="mr-2" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <FiX className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
