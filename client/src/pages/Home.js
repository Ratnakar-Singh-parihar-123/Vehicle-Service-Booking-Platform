import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiShield, 
  FiUsers, 
  FiStar,
  FiArrowRight 
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FiCalendar,
      title: 'Easy Booking',
      description: 'Book your vehicle service appointments in just a few clicks'
    },
    {
      icon: FiClock,
      title: 'Flexible Timing',
      description: 'Choose from available time slots that fit your schedule'
    },
    {
      icon: FiMapPin,
      title: 'Multiple Locations',
      description: 'Find service centers near you or request pickup service'
    },
    {
      icon: FiShield,
      title: 'Trusted Service',
      description: 'All our service centers are verified and certified'
    },
    {
      icon: FiUsers,
      title: 'Expert Technicians',
      description: 'Experienced professionals handle your vehicle with care'
    },
    {
      icon: FiStar,
      title: 'Quality Guarantee',
      description: 'We guarantee the quality of our services and parts'
    }
  ];

  const services = [
    'Oil Change',
    'Brake Service',
    'Engine Repair',
    'AC Service',
    'Battery Service',
    'Tire Service',
    'General Maintenance',
    'Emergency Service'
  ];

  return (
    <>
      <Helmet>
        <title>Vehicle Service Booking Platform - Easy & Reliable</title>
        <meta name="description" content="Book vehicle services easily with our comprehensive platform. Find trusted service centers, schedule appointments, and track your bookings." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Vehicle Deserves the
              <span className="block text-primary-200">Best Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Book appointments with trusted service centers, track your bookings, 
              and keep your vehicle in perfect condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/book-service"
                  className="btn-secondary btn-lg inline-flex items-center"
                >
                  Book Service Now
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-secondary btn-lg inline-flex items-center"
                  >
                    Get Started
                    <FiArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary-600"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We make vehicle servicing simple, convenient, and reliable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 text-center hover:shadow-medium transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive vehicle services to keep your car running smoothly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="card p-4 text-center hover:shadow-medium transition-shadow duration-300"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {service}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their vehicle service needs.
          </p>
          {user ? (
            <Link
              to="/book-service"
              className="btn-secondary btn-lg inline-flex items-center"
            >
              Book Your First Service
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          ) : (
            <Link
              to="/register"
              className="btn-secondary btn-lg inline-flex items-center"
            >
              Create Your Account
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
