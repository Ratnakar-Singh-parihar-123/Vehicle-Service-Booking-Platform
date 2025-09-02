import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  FiShield,
  FiClock,
  FiUsers,
  FiTool,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiTruck,
  FiSettings,
  FiHeart,
  FiX,
  FiArrowRight,
} from 'react-icons/fi';

const About = () => {
  const navigate = useNavigate();
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);

  // Handle Book Service button click
  const handleBookService = () => {
    navigate('/book-service');
  };

  // Handle Learn More button click
  const handleLearnMore = () => {
    setShowLearnMoreModal(true);
  };

  // Close Learn More modal
  const closeLearnMoreModal = () => {
    setShowLearnMoreModal(false);
  };

  const features = [
    {
      icon: FiClock,
      title: '24/7 Service',
      description: 'Round-the-clock vehicle service booking and emergency support whenever you need it.',
    },
    {
      icon: FiShield,
      title: 'Trusted Partners',
      description: 'Certified service centers and experienced mechanics you can trust with your vehicle.',
    },
    {
      icon: FiUsers,
      title: 'Expert Team',
      description: 'Professional technicians with years of experience in automotive service and repair.',
    },
    {
      icon: FiTool,
      title: 'Quality Service',
      description: 'High-quality parts and comprehensive service packages for all vehicle types.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Service Centers' },
    { number: '500+', label: 'Expert Mechanics' },
    { number: '99%', label: 'Customer Satisfaction' },
  ];

  const services = [
    'Oil Change & Filter Replacement',
    'Brake Service & Repair',
    'Engine Diagnostics & Repair',
    'AC Service & Repair',
    'Battery Service & Replacement',
    'Tire Service & Alignment',
    'Transmission Service',
    'Electrical System Repair',
    'Body Work & Painting',
    'Vehicle Inspection',
    'Emergency Roadside Service',
    'Preventive Maintenance',
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Vehicle Service Booking Platform</title>
        <meta
          name="description"
          content="Learn about our vehicle service booking platform, our mission, and how we connect customers with trusted automotive service providers."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {/* The SVG URL was malformed. This fixes it. */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
                About Our Platform
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-100 max-w-4xl mx-auto px-2 sm:px-4 leading-relaxed">
                Connecting vehicle owners with trusted service providers for seamless automotive care
              </p>

              {/* Hero Stats */}
              <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">10K+</div>
                  <div className="text-xs sm:text-sm text-primary-200 mt-1">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">500+</div>
                  <div className="text-xs sm:text-sm text-primary-200 mt-1">Service Centers</div>
                </div>
                <div className="text-center col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">24/7</div>
                  <div className="text-xs sm:text-sm text-primary-200 mt-1">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                  We're revolutionizing the automotive service industry by creating a seamless platform that connects
                  vehicle owners with trusted, certified service providers. Our mission is to make vehicle maintenance
                  convenient, transparent, and reliable.
                </p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                  Whether you need routine maintenance, emergency repairs, or specialized services, our platform ensures
                  you get quality service from verified professionals at competitive prices.
                </p>
                <div className="flex items-center space-x-3 sm:space-x-4 bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <FiHeart className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                    Trusted by thousands of vehicle owners
                  </span>
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center lg:text-left">
                  Why Choose Us?
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal Line Added */}
        <hr className="my-12 border-t border-gray-200 dark:border-gray-700" />

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Our Impact
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Numbers that speak for our commitment to excellence
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600 mb-2 sm:mb-3">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Line Added */}
        <hr className="my-12 border-t border-gray-200 dark:border-gray-700" />
        
        {/* Services Section */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Our Services
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4 sm:px-0">
                Comprehensive automotive services to keep your vehicle running smoothly
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm sm:text-base text-gray-900 dark:text-white font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Line Added */}
        <hr className="my-12 border-t border-gray-200 dark:border-gray-700" />
        
        {/* How It Works Section */}
        <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-primary-900/20 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Simple steps to get your vehicle serviced
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div className="text-center group">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                    <FiTruck className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                  </div>
                  {/* Connection line for desktop */}
                  <div className="hidden md:block absolute top-8 sm:top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent -z-10"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  1. Book Service
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed px-2 sm:px-0">
                  Choose your vehicle, select service type, and pick a convenient time slot
                </p>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                    <FiMapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                  </div>
                  {/* Connection line for desktop */}
                  <div className="hidden md:block absolute top-8 sm:top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent -z-10"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  2. Find Service Center
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed px-2 sm:px-0">
                  We connect you with the nearest certified service center or arrange pickup
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <FiSettings className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  3. Get Service
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed px-2 sm:px-0">
                  Professional technicians service your vehicle with quality parts and care
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal Line Added */}
        <hr className="my-12 border-t border-gray-200 dark:border-gray-700" />
        
        {/* Contact Section */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Get In Touch
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Have questions? We're here to help
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">24/7 Customer Support</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FiMail className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400">support@vehicleservice.com</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">We'll respond within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                <address className="text-gray-600 dark:text-gray-400 not-italic">
                  123 Service Street
                  <br />
                  New York, NY 10001
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-blue-800 text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {/* The SVG URL was malformed. This fixes it. */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Ready to Service Your Vehicle?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-primary-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed">
              Join thousands of satisfied customers who trust us with their vehicle maintenance
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <button
                onClick={handleBookService}
                className="bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-sm sm:text-base">Book Service Now</span>
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>
              <button
                onClick={handleLearnMore}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-sm sm:text-base">Learn More</span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-primary-200 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <FiShield className="w-4 h-4" aria-hidden="true" />
                <span>Secure & Trusted</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4" aria-hidden="true" />
                <span>10K+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4" aria-hidden="true" />
                <span>Verified Service Centers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Learn More Modal */}
        {showLearnMoreModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white pr-4">
                  Learn More About Our Platform
                </h2>
                <button
                  onClick={closeLearnMoreModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6">
                <div className="space-y-6 sm:space-y-8">
                  {/* Platform Overview */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      <span role="img" aria-label="car">
                        🚗
                      </span>{' '}
                      Platform Overview
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                      Our Vehicle Service Booking Platform is a comprehensive solution that bridges the gap between
                      vehicle owners and trusted automotive service providers. We've created an ecosystem where
                      convenience meets quality.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                          For Customers
                        </h4>
                        <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Easy online booking system</li>
                          <li>• Real-time service tracking</li>
                          <li>• Transparent pricing</li>
                          <li>• Quality assurance</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                          For Service Centers
                        </h4>
                        <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Streamlined booking management</li>
                          <li>• Customer communication tools</li>
                          <li>• Business analytics</li>
                          <li>• Payment processing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      <span role="img" aria-label="laptop">
                        💻
                      </span>{' '}
                      Technology & Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiSettings className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Modern Tech Stack</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Built with React.js, Node.js, and MongoDB for optimal performance
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiShield className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Secure & Reliable</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Enterprise-grade security with encrypted data and secure payments
                        </p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiUsers className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">User-Centric Design</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Intuitive interface designed for both customers and service providers
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      <span role="img" aria-label="sparkles">
                        ✨
                      </span>{' '}
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">For Vehicle Owners</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Convenience</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Book services from anywhere, anytime
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Transparency</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Clear pricing and service details upfront
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Quality Assurance</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Verified service centers and mechanics
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">For Service Providers</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Business Growth</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Reach more customers and increase revenue
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Streamlined Operations</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Efficient booking and customer management
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Digital Presence</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Professional online presence and reviews
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Future Roadmap */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      <span role="img" aria-label="rocket">
                        🚀
                      </span>{' '}
                      Future Roadmap
                    </h3>
                    <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900 dark:to-blue-900 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Coming Soon</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Mobile app for iOS and Android</li>
                            <li>• AI-powered service recommendations</li>
                            <li>• Real-time GPS tracking</li>
                            <li>• Video consultation features</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Long-term Vision</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• IoT integration for predictive maintenance</li>
                            <li>• Blockchain-based service records</li>
                            <li>• Electric vehicle specialized services</li>
                            <li>• International expansion</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleBookService}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Get Started - Book Service
                    <FiArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={closeLearnMoreModal}
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default About;