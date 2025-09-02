import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiCalendar, 
  // FiTruck,
  // FiTool,
  FiUsers,
  FiClock,
  FiBarChart,
  FiPieChart,
  FiActivity,
  FiTarget
} from 'react-icons/fi';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Mock analytics data
    const mockAnalytics = {
      overview: {
        totalRevenue: 125430,
        revenueChange: 12.5,
        totalBookings: 1247,
        bookingsChange: 8.3,
        totalCustomers: 892,
        customersChange: 15.2,
        avgServiceTime: 2.4,
        serviceTimeChange: -5.1
      },
      revenueChart: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [18500, 22300, 19800, 25600, 28900, 30200]
      },
      serviceTypes: [
        { name: 'Oil Change', value: 35, color: '#3B82F6' },
        { name: 'Brake Service', value: 25, color: '#10B981' },
        { name: 'Tire Service', value: 20, color: '#F59E0B' },
        { name: 'Engine Repair', value: 15, color: '#EF4444' },
        { name: 'Other', value: 5, color: '#8B5CF6' }
      ],
      topServices: [
        { name: 'Oil Change', bookings: 432, revenue: 19440 },
        { name: 'Brake Inspection', bookings: 298, revenue: 26820 },
        { name: 'Tire Rotation', bookings: 267, revenue: 6675 },
        { name: 'Engine Diagnostic', bookings: 156, revenue: 23400 },
        { name: 'Battery Replacement', bookings: 94, revenue: 14100 }
      ],
      customerSatisfaction: {
        average: 4.7,
        total: 1247,
        distribution: [
          { stars: 5, count: 892, percentage: 71.5 },
          { stars: 4, count: 249, percentage: 20.0 },
          { stars: 3, count: 75, percentage: 6.0 },
          { stars: 2, count: 19, percentage: 1.5 },
          { stars: 1, count: 12, percentage: 1.0 }
        ]
      },
      recentActivity: [
        { id: 1, type: 'booking', message: 'New booking: Oil Change - John Doe', time: '2 minutes ago' },
        { id: 2, type: 'payment', message: 'Payment received: $89.99 - Jane Smith', time: '5 minutes ago' },
        { id: 3, type: 'completion', message: 'Service completed: Brake Inspection - Mike Johnson', time: '12 minutes ago' },
        { id: 4, type: 'booking', message: 'New booking: Tire Rotation - Sarah Wilson', time: '18 minutes ago' }
      ]
    };

    setAnalytics(mockAnalytics);
  }, [timeRange]);

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, change, icon: Icon, format = 'number' }) => {
    const isPositive = change > 0;
    const formattedValue = format === 'currency' 
      ? `$${value.toLocaleString()}` 
      : format === 'time'
      ? `${value}h`
      : value.toLocaleString();

    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{formattedValue}</p>
            <div className={`flex items-center mt-2 text-sm ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? <FiTrendingUp className="w-4 h-4 mr-1" /> : <FiTrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(change)}% from last month
            </div>
          </div>
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
      </motion.div>
    );
  };

  const SimpleBarChart = ({ data, labels }) => {
    const maxValue = Math.max(...data);
    
    return (
      <div className="space-y-3">
        {data.map((value, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
              {labels[index]}
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(value / maxValue) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="bg-gradient-to-r from-primary-500 to-blue-500 h-3 rounded-full"
              />
            </div>
            <div className="w-16 text-sm font-medium text-gray-900 dark:text-white text-right">
              ${value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center space-x-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              cumulativePercentage += percentage;

              return (
                <motion.circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="drop-shadow-sm"
                />
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your business performance and insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={analytics.overview.totalRevenue}
          change={analytics.overview.revenueChange}
          icon={FiDollarSign}
          format="currency"
        />
        <StatCard
          title="Total Bookings"
          value={analytics.overview.totalBookings}
          change={analytics.overview.bookingsChange}
          icon={FiCalendar}
        />
        <StatCard
          title="Total Customers"
          value={analytics.overview.totalCustomers}
          change={analytics.overview.customersChange}
          icon={FiUsers}
        />
        <StatCard
          title="Avg Service Time"
          value={analytics.overview.avgServiceTime}
          change={analytics.overview.serviceTimeChange}
          icon={FiClock}
          format="time"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <FiBarChart className="w-5 h-5 text-gray-400" />
          </div>
          <SimpleBarChart 
            data={analytics.revenueChart.data} 
            labels={analytics.revenueChart.labels} 
          />
        </div>

        {/* Service Types Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Service Types</h3>
            <FiPieChart className="w-5 h-5 text-gray-400" />
          </div>
          <PieChart data={analytics.serviceTypes} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Services</h3>
            <FiTarget className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{service.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{service.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">${service.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Satisfaction</h3>
            <FiActivity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">{analytics.customerSatisfaction.average}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">out of 5 stars</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">({analytics.customerSatisfaction.total} reviews)</div>
          </div>
          <div className="space-y-2">
            {analytics.customerSatisfaction.distribution.map((rating) => (
              <div key={rating.stars} className="flex items-center space-x-3">
                <div className="w-8 text-sm text-gray-600 dark:text-gray-400">{rating.stars}★</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rating.percentage}%` }}
                    transition={{ duration: 1, delay: rating.stars * 0.1 }}
                    className="bg-yellow-400 h-2 rounded-full"
                  />
                </div>
                <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                  {rating.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <FiActivity className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analytics.recentActivity.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: activity.id * 0.1 }}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'booking' ? 'bg-blue-500' :
                activity.type === 'payment' ? 'bg-green-500' :
                activity.type === 'completion' ? 'bg-purple-500' : 'bg-gray-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
