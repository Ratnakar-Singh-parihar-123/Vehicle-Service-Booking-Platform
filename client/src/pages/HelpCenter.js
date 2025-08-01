import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FiHelpCircle, 
  FiUser,
  FiTool,
  FiCreditCard,
  FiShield,
  FiPhone,
  FiMail,
  FiMessageCircle,
  FiBook,
  FiVideo,
  FiDownload,
  FiArrowRight,
  FiClock,
  FiMapPin,
  FiSettings,
  FiFileText,
  FiSearch
} from 'react-icons/fi';

const HelpCenter = () => {
  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using our platform',
      icon: FiUser,
      color: 'bg-blue-500',
      articles: [
        'Creating Your Account',
        'Setting Up Your Profile',
        'Adding Your Vehicle Information',
        'Understanding the Dashboard'
      ]
    },
    {
      id: 'booking-services',
      title: 'Booking Services',
      description: 'How to book and manage service appointments',
      icon: FiTool,
      color: 'bg-green-500',
      articles: [
        'How to Book a Service',
        'Choosing the Right Service Center',
        'Managing Your Bookings',
        'Canceling or Rescheduling'
      ]
    },
    {
      id: 'payments-billing',
      title: 'Payments & Billing',
      description: 'Payment methods, billing, and refunds',
      icon: FiCreditCard,
      color: 'bg-yellow-500',
      articles: [
        'Payment Methods',
        'Understanding Your Bill',
        'Refund Policies',
        'Payment Security'
      ]
    },
    {
      id: 'account-security',
      title: 'Account & Security',
      description: 'Keep your account safe and secure',
      icon: FiShield,
      color: 'bg-red-500',
      articles: [
        'Password Security',
        'Two-Factor Authentication',
        'Privacy Settings',
        'Account Recovery'
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Common issues and solutions',
      icon: FiSettings,
      color: 'bg-purple-500',
      articles: [
        'Login Problems',
        'Booking Issues',
        'Payment Failures',
        'App Not Working'
      ]
    },
    {
      id: 'policies',
      title: 'Policies & Legal',
      description: 'Terms, privacy, and legal information',
      icon: FiFileText,
      color: 'bg-gray-500',
      articles: [
        'Terms of Service',
        'Privacy Policy',
        'Cancellation Policy',
        'Service Guarantees'
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: FiPhone,
      action: 'contact',
      color: 'bg-primary-600'
    },
    {
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      icon: FiMessageCircle,
      action: 'chat',
      color: 'bg-success-600'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: FiVideo,
      action: 'videos',
      color: 'bg-secondary-600'
    },
    {
      title: 'Download Guides',
      description: 'Get PDF guides and manuals',
      icon: FiDownload,
      action: 'downloads',
      color: 'bg-warning-600'
    }
  ];

  const popularArticles = [
    {
      title: 'How to Book Your First Service',
      category: 'Getting Started',
      readTime: '3 min read',
      views: '2.5k views'
    },
    {
      title: 'Understanding Service Pricing',
      category: 'Payments & Billing',
      readTime: '5 min read',
      views: '1.8k views'
    },
    {
      title: 'Choosing the Right Service Center',
      category: 'Booking Services',
      readTime: '4 min read',
      views: '1.6k views'
    },
    {
      title: 'Account Security Best Practices',
      category: 'Account & Security',
      readTime: '6 min read',
      views: '1.2k views'
    }
  ];

  const contactOptions = [
    {
      title: 'Email Support',
      description: 'Get detailed help via email',
      contact: 'support@vehicleservice.com',
      responseTime: 'Response within 24 hours',
      icon: FiMail,
      color: 'text-blue-600'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      responseTime: 'Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM',
      icon: FiPhone,
      color: 'text-green-600'
    },
    {
      title: 'Emergency Support',
      description: '24/7 roadside assistance',
      contact: '+1 (555) 911-HELP',
      responseTime: 'Available 24/7',
      icon: FiClock,
      color: 'text-red-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Help Center - Vehicle Service Booking Platform</title>
        <meta name="description" content="Get help and support for the Vehicle Service Booking Platform. Find guides, tutorials, FAQs, and contact information for customer support." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Help Center
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
                Find guides, tutorials, and get the support you need
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search help articles..."
                    className="w-full pl-10 pr-3 py-3 border border-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-white focus:border-transparent bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get immediate help with these quick options
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickActions.map((action, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {action.description}
                </p>
              </div>
            ))}
          </div>

          {/* Help Categories */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Browse by Category
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find help articles organized by topic
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category) => (
                <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.articles.map((article, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                        <FiArrowRight className="w-3 h-3 mr-2 flex-shrink-0" />
                        {article}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Most viewed help articles
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularArticles.map((article, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {article.title}
                    </h3>
                    <FiArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                    {article.category}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <FiClock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </span>
                    <span>{article.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Support
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Still need help? Our support team is here for you
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <option.icon className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {option.description}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    {option.contact}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {option.responseTime}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/faq"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FiHelpCircle className="w-4 h-4 mr-2" />
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
