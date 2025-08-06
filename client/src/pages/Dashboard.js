import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiSettings,
  FiPlus,
  FiTrendingUp,
  FiMapPin,
  FiPhone,
  FiMail,
  FiLogOut,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import { dashboardService } from '../services/dashboardService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    recentBookings: [],
    upcomingAppointments: [],
    stats: {},
    quickActions: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Fetch all dashboard data in parallel
      const [recentBookingsRes, upcomingRes, statsRes] = await Promise.allSettled([
        dashboardService.getRecentBookings(5),
        dashboardService.getUpcomingAppointments(),
        dashboardService.getUserStats()
      ]);

      // Process results
      const newData = {
        recentBookings: recentBookingsRes.status === 'fulfilled' ? recentBookingsRes.value.data.data || [] : [],
        upcomingAppointments: upcomingRes.status === 'fulfilled' ? upcomingRes.value.data.data || [] : [],
        stats: statsRes.status === 'fulfilled' ? statsRes.value.data.data || {} : {},
        quickActions: getQuickActionsByRole(user?.role)
      };

      setDashboardData(newData);

      if (isRefresh) {
        toast.success('Dashboard refreshed successfully');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Get quick actions based on user role
  const getQuickActionsByRole = (role) => {
    const baseActions = [
      {
        title: 'Book Service',
        description: 'Schedule a new service appointment',
        icon: FiPlus,
        link: '/book-service',
        color: 'bg-primary-600 hover:bg-primary-700'
      },
      {
        title: 'My Bookings',
        description: 'View all your bookings',
        icon: FiCalendar,
        link: '/my-bookings',
        color: 'bg-success-600 hover:bg-success-700'
      },
      {
        title: 'Profile',
        description: 'Update your profile information',
        icon: FiUser,
        link: '/profile',
        color: 'bg-secondary-600 hover:bg-secondary-700'
      }
    ];

    if (role === 'service_center') {
      return [
        {
          title: 'Manage Bookings',
          description: 'View and manage customer bookings',
          icon: FiCalendar,
          link: '/service-center/bookings',
          color: 'bg-primary-600 hover:bg-primary-700'
        },
        {
          title: 'Service Center Profile',
          description: 'Update service center information',
          icon: FiSettings,
          link: '/service-center/profile',
          color: 'bg-success-600 hover:bg-success-700'
        },
        {
          title: 'Analytics',
          description: 'View performance analytics',
          icon: FiTrendingUp,
          link: '/service-center/analytics',
          color: 'bg-secondary-600 hover:bg-secondary-700'
        }
      ];
    }

    if (role === 'admin') {
      return [
        {
          title: 'Admin Panel',
          description: 'Manage system settings',
          icon: FiSettings,
          link: '/admin/dashboard',
          color: 'bg-primary-600 hover:bg-primary-700'
        },
        {
          title: 'User Management',
          description: 'Manage users and service centers',
          icon: FiUser,
          link: '/admin/users',
          color: 'bg-success-600 hover:bg-success-700'
        },
        {
          title: 'System Analytics',
          description: 'View system-wide analytics',
          icon: FiTrendingUp,
          link: '/admin/analytics',
          color: 'bg-secondary-600 hover:bg-secondary-700'
        }
      ];
    }

    return baseActions;
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // Get status color for bookings
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success-600 bg-success-100 dark:bg-success-900 dark:text-success-200';
      case 'pending':
        return 'text-warning-600 bg-warning-100 dark:bg-warning-900 dark:text-warning-200';
      case 'in_progress':
        return 'text-primary-600 bg-primary-100 dark:bg-primary-900 dark:text-primary-200';
      case 'completed':
        return 'text-success-600 bg-success-100 dark:bg-success-900 dark:text-success-200';
      case 'cancelled':
        return 'text-danger-600 bg-danger-100 dark:bg-danger-900 dark:text-danger-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return FiCheckCircle;
      case 'pending':
        return FiClock;
      case 'cancelled':
        return FiXCircle;
      default:
        return FiAlertCircle;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Vehicle Service Booking</title>
        <meta name="description" content="Your personal dashboard for managing vehicle services" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user?.firstName}!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">
                    {user?.role?.replace('_', ' ')} Dashboard
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button
                  onClick={() => fetchDashboardData(true)}
                  disabled={refreshing}
                  className="btn-outline flex items-center"
                >
                  <FiRefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="btn-danger flex items-center"
                >
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 bg-danger-50 dark:bg-danger-900 border border-danger-200 dark:border-danger-700 rounded-md p-4">
              <div className="flex">
                <FiAlertCircle className="h-5 w-5 text-danger-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-danger-800 dark:text-danger-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group`}
                >
                  <div className="flex items-center">
                    <action.icon className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <h3 className="font-semibold text-lg">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          {Object.keys(dashboardData.stats).length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <FiCalendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {dashboardData.stats.totalBookings || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
                      <FiCheckCircle className="w-6 h-6 text-success-600 dark:text-success-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {dashboardData.stats.completedBookings || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center">
                      <FiClock className="w-6 h-6 text-warning-600 dark:text-warning-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {dashboardData.stats.pendingBookings || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center">
                      <FiTrendingUp className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {dashboardData.stats.monthlyBookings || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="card-header">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Bookings
                    </h3>
                    <Link
                      to="/my-bookings"
                      className="text-primary-600 hover:text-primary-500 dark:text-primary-400 text-sm font-medium"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  {dashboardData.recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.recentBookings.map((booking) => {
                        const StatusIcon = getStatusIcon(booking.status);
                        return (
                          <div
                            key={booking._id || booking.id}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                                <FiCalendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {booking.services?.[0]?.service?.name || 'Service Booking'}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {booking.serviceCenter?.name || 'Service Center'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                  {formatDate(booking.scheduledDateTime || booking.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">No recent bookings</p>
                      <Link
                        to="/book-service"
                        className="btn-primary"
                      >
                        Book Your First Service
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Profile Info
                  </h3>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FiUser className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {user?.role?.replace('_', ' ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FiMail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {user?.email}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Email address
                        </p>
                      </div>
                    </div>

                    {user?.phone && (
                      <div className="flex items-center space-x-3">
                        <FiPhone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {user.phone}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Phone number
                          </p>
                        </div>
                      </div>
                    )}

                    {user?.address?.city && (
                      <div className="flex items-center space-x-3">
                        <FiMapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {user.address.city}, {user.address.state}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Location
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/profile"
                      className="btn-outline w-full flex items-center justify-center"
                    >
                      <FiSettings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Upcoming Appointments
                  </h3>
                </div>
                <div className="card-body">
                  {dashboardData.upcomingAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.upcomingAppointments.slice(0, 3).map((appointment) => (
                        <div
                          key={appointment._id || appointment.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                            <FiClock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {appointment.services?.[0]?.service?.name || 'Service'}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {formatDate(appointment.scheduledDateTime)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <FiClock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No upcoming appointments
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          {(user?.role === 'service_center' || user?.role === 'admin') && (
            <div className="mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Business Analytics
                </h2>
                <AnalyticsDashboard />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
