import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTool,
  FiSettings,
  FiZap,
  FiShield,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiStar,
  FiDollarSign,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiFilter,
  FiSearch,
  FiHeart,
  FiAward,
  FiUsers,
  FiThumbsUp,
  FiTrendingUp,
  FiX
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Services = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const serviceCategories = [
    {
      id: 'all',
      name: 'All Services',
      icon: FiTool,
      color: 'from-blue-500 to-cyan-500',
      count: 12
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      icon: FiSettings,
      color: 'from-green-500 to-emerald-500',
      count: 5
    },
    {
      id: 'repair',
      name: 'Repair',
      icon: FiTool,
      color: 'from-orange-500 to-red-500',
      count: 4
    },
    {
      id: 'electrical',
      name: 'Electrical',
      icon: FiZap,
      color: 'from-yellow-500 to-orange-500',
      count: 2
    },
    {
      id: 'emergency',
      name: 'Emergency',
      icon: FiShield,
      color: 'from-red-500 to-pink-500',
      count: 1
    }
  ];

  const services = [
    {
      id: 1,
      name: 'Oil Change & Filter Replacement',
      category: 'maintenance',
      price: 'Starting at $35',
      duration: '30-45 minutes',
      description: 'Complete oil change service with high-quality oil and filter replacement to keep your engine running smoothly.',
      features: ['Premium oil options', 'Filter replacement', 'Fluid level check', 'Multi-point inspection'],
      icon: FiTool,
      popular: true,
      rating: 4.9,
      reviews: 1247,
      image: '/api/placeholder/400/250',
      warranty: '6 months',
      bookings: 2341
    },
    {
      id: 2,
      name: 'Brake Service & Repair',
      category: 'repair',
      price: 'Starting at $120',
      duration: '1-2 hours',
      description: 'Comprehensive brake system inspection, repair, and replacement services for optimal safety.',
      features: ['Brake pad replacement', 'Rotor resurfacing', 'Brake fluid change', 'Safety inspection'],
      icon: FiShield,
      popular: false,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Engine Diagnostics & Repair',
      category: 'repair',
      price: 'Starting at $95',
      duration: '1-3 hours',
      description: 'Advanced computer diagnostics to identify and resolve engine performance issues.',
      features: ['Computer diagnostics', 'Error code analysis', 'Performance testing', 'Repair recommendations'],
      icon: FiSettings,
      popular: false,
      rating: 4.7
    },
    {
      id: 4,
      name: 'AC Service & Repair',
      category: 'maintenance',
      price: 'Starting at $85',
      duration: '45-90 minutes',
      description: 'Complete air conditioning system service including refrigerant recharge and component inspection.',
      features: ['Refrigerant recharge', 'System inspection', 'Leak detection', 'Component replacement'],
      icon: FiZap,
      popular: true,
      rating: 4.6
    },
    {
      id: 5,
      name: 'Battery Service & Replacement',
      category: 'electrical',
      price: 'Starting at $65',
      duration: '20-30 minutes',
      description: 'Battery testing, maintenance, and replacement services to ensure reliable vehicle starting.',
      features: ['Battery testing', 'Terminal cleaning', 'Charging system check', 'Battery replacement'],
      icon: FiZap,
      popular: false,
      rating: 4.8
    },
    {
      id: 6,
      name: 'Tire Service & Alignment',
      category: 'maintenance',
      price: 'Starting at $75',
      duration: '45-60 minutes',
      description: 'Tire rotation, balancing, alignment, and replacement services for optimal performance.',
      features: ['Tire rotation', 'Wheel balancing', 'Alignment check', 'Tire replacement'],
      icon: FiTruck,
      popular: true,
      rating: 4.7
    },
    {
      id: 7,
      name: 'Transmission Service',
      category: 'maintenance',
      price: 'Starting at $150',
      duration: '1-2 hours',
      description: 'Transmission fluid change and system inspection to maintain smooth shifting.',
      features: ['Fluid replacement', 'Filter change', 'System inspection', 'Performance test'],
      icon: FiSettings,
      popular: false,
      rating: 4.5
    },
    {
      id: 8,
      name: 'Emergency Roadside Service',
      category: 'emergency',
      price: 'Starting at $50',
      duration: '30-60 minutes',
      description: '24/7 emergency roadside assistance including jump starts, tire changes, and towing.',
      features: ['Jump start service', 'Flat tire change', 'Lockout assistance', 'Emergency towing'],
      icon: FiShield,
      popular: false,
      rating: 4.9
    },
    {
      id: 9,
      name: 'Electrical System Repair',
      category: 'electrical',
      price: 'Starting at $110',
      duration: '1-3 hours',
      description: 'Comprehensive electrical system diagnostics and repair for all vehicle electrical components.',
      features: ['Electrical diagnostics', 'Wiring repair', 'Component replacement', 'System testing'],
      icon: FiZap,
      popular: false,
      rating: 4.6
    },
    {
      id: 10,
      name: 'General Vehicle Inspection',
      category: 'maintenance',
      price: 'Starting at $45',
      duration: '30-45 minutes',
      description: 'Comprehensive multi-point inspection to identify potential issues and maintenance needs.',
      features: ['Safety inspection', 'Fluid level check', 'Belt and hose inspection', 'Detailed report'],
      icon: FiCheckCircle,
      popular: true,
      rating: 4.8
    }
  ];

  // Utility functions
  const toggleFavorite = (serviceId) => {
    setFavorites(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortBy('popular');
  };

  // Enhanced filtering and sorting
  const filteredServices = services
    .filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = searchTerm === '' ||
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Stats for display
  const stats = [
    { label: 'Total Services', value: services.length, icon: FiTool },
    { label: 'Happy Customers', value: '15K+', icon: FiUsers },
    { label: 'Average Rating', value: '4.8', icon: FiStar },
    { label: 'Service Centers', value: '50+', icon: FiMapPin }
  ];

  const features = [
    {
      icon: FiCheckCircle,
      title: 'Certified Technicians',
      description: 'All our service providers are certified and experienced professionals'
    },
    {
      icon: FiShield,
      title: 'Quality Guarantee',
      description: 'We guarantee the quality of all services with comprehensive warranties'
    },
    {
      icon: FiClock,
      title: 'Fast Service',
      description: 'Quick turnaround times without compromising on service quality'
    },
    {
      icon: FiDollarSign,
      title: 'Competitive Pricing',
      description: 'Transparent, competitive pricing with no hidden fees'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Premium Vehicle Services - Professional Car Care & Maintenance</title>
        <meta name="description" content="Comprehensive automotive services including maintenance, repair, electrical, and emergency services. Professional technicians, quality guarantee, and competitive pricing." />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Premium
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Vehicle Services
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Professional automotive services with certified technicians, quality guarantee,
                and transparent pricing. Your vehicle deserves the best care.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  );
                })}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Link
                  to="/book-service"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  <span>Book Service Now</span>
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <FiPhone className="mr-2 w-5 h-5" />
                  <span>Contact Us</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Services?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Experience professional automotive care with cutting-edge technology and uncompromising quality standards.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group text-center bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <div className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Available Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Browse our comprehensive range of automotive services
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8 space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div key={service.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Service Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      {service.popular && (
                        <span className="bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-400 text-xs font-medium px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Service Info */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {service.description}
                    </p>

                    {/* Service Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Price:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{service.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Rating:</span>
                        <div className="flex items-center">
                          <FiStar className="w-4 h-4 text-warning-500 mr-1" />
                          <span className="font-medium text-gray-900 dark:text-white">{service.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Includes:</h4>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <FiCheckCircle className="w-3 h-3 text-success-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-sm text-gray-500 dark:text-gray-500">
                            +{service.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <Link
                      to="/book-service"
                      className="w-full bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      Book This Service
                      <FiArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <FiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No services found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm 
                    ? `No services match your search "${searchTerm}"`
                    : `No services available in the ${selectedCategory} category`
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Service Your Vehicle?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Book your service appointment today and experience professional automotive care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book-service"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <FiCalendar className="w-5 h-5 mr-2" />
                Book Service Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
              >
                <FiPhone className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
