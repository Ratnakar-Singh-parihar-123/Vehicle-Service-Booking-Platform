import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBell, 
  FiX, 
  FiCheck, 
  FiClock, 
  FiTool, 
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiSettings,
  FiChevronRight
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'booking_confirmed',
        title: 'Booking Confirmed',
        message: 'Your oil change service has been confirmed for tomorrow at 10:00 AM',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        icon: FiCheck,
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30'
      },
      {
        id: 2,
        type: 'reminder',
        title: 'Service Reminder',
        message: 'Your vehicle is due for maintenance in 3 days',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        icon: FiClock,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30'
      },
      {
        id: 3,
        type: 'service_update',
        title: 'Service in Progress',
        message: 'Your brake inspection is currently being performed by our technician',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        read: true,
        icon: FiTool,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30'
      },
      {
        id: 4,
        type: 'payment',
        title: 'Payment Processed',
        message: 'Payment of $89.99 has been successfully processed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        icon: FiDollarSign,
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30'
      },
      {
        id: 5,
        type: 'appointment',
        title: 'Upcoming Appointment',
        message: 'You have a tire rotation scheduled for next week',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
        icon: FiCalendar,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const filters = [
    { key: 'all', label: 'All', count: notifications.length },
    { key: 'unread', label: 'Unread', count: unreadCount },
    { key: 'read', label: 'Read', count: notifications.length - unreadCount }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Notification Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FiBell className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Notifications</h2>
                    <p className="text-white/80 text-sm">
                      {unreadCount} unread notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
                {filters.map((filterOption) => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      filter === filterOption.key
                        ? 'bg-white text-primary-600'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {filterOption.label}
                    {filterOption.count > 0 && (
                      <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                        filter === filterOption.key
                          ? 'bg-primary-100 text-primary-600'
                          : 'bg-white/20 text-white'
                      }`}>
                        {filterOption.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={markAllAsRead}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm font-medium"
                >
                  Mark all as read
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <FiBell className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredNotifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <motion.div
                        key={notification.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                            <Icon className={`w-5 h-5 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className={`text-sm font-medium ${
                                !notification.read 
                                  ? 'text-gray-900 dark:text-white' 
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary-600 rounded-full ml-2" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                              </p>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <FiX className="w-4 h-4" />
                                </button>
                                <FiChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <button className="w-full flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium">
                <FiSettings className="w-4 h-4" />
                <span>Notification Settings</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
