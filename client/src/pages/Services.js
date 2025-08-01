import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  FiSearch
} from 'react-icons/fi';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: FiTool },
    { id: 'maintenance', name: 'Maintenance', icon: FiSettings },
    { id: 'repair', name: 'Repair', icon: FiTool },
    { id: 'electrical', name: 'Electrical', icon: FiZap },
    { id: 'emergency', name: 'Emergency', icon: FiShield }
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
      rating: 4.9
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

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

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
        <title>Services - Vehicle Service Booking Platform</title>
        <meta name="description" content="Comprehensive automotive services including maintenance, repair, electrical, and emergency services. Book your vehicle service today." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
                Comprehensive automotive services to keep your vehicle running at its best
              </p>
              <Link
                to="/book-service"
                className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <FiCalendar className="w-5 h-5 mr-2" />
                Book Service Now
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Our Services?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Professional automotive care you can trust
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
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
