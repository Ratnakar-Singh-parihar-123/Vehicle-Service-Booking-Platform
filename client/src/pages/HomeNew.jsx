import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiShield, 
  FiUsers, 
  FiStar,
  FiArrowRight,
  FiCheckCircle,
  FiTool,
  FiAward,
  FiTrendingUp,
  FiHeart,
  FiZap,
  FiGlobe,
  FiSmartphone,
  FiMonitor,
  FiTablet,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
  FiQuote,
  FiPhone,
  FiMail
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
// import test1 from '../assets/testimonialsUser/SarahJohnson.png';
// import test2 from '../assets/testimonialsUser/MichaelChen.png';
// import test3 from '../assets/testimonialsUser/';

const Home = () => {
  const { user } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // Enhanced features with better descriptions and icons
  const features = [
    {
      icon: FiCalendar,
      title: 'Smart Booking System',
      description: 'AI-powered scheduling that finds the perfect time slot for your vehicle service',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiZap,
      title: 'Lightning Fast Service',
      description: 'Quick turnaround times without compromising on quality or attention to detail',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FiShield,
      title: 'Premium Quality Guarantee',
      description: 'Certified technicians using genuine parts with comprehensive warranty coverage',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiHeart,
      title: 'Customer-First Approach',
      description: 'Personalized service experience tailored to your vehicle and preferences',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: FiGlobe,
      title: 'Nationwide Network',
      description: 'Access to premium service centers across the country with consistent quality',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Advanced Analytics',
      description: 'Track your vehicle health, service history, and maintenance predictions',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Business Executive',
      image: '/api/placeholder/80/8',
      rating: 5,
      text: 'Absolutely incredible service! The booking process was seamless, and my car has never run better. The technicians were professional and explained everything clearly.',
      vehicle: '2021 Tesla Model 3'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineer',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The digital experience is outstanding. Real-time updates, transparent pricing, and exceptional quality. This is the future of vehicle maintenance!',
      vehicle: '2020 BMW X5'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'I love how convenient everything is. From booking to payment, everything is handled digitally. The service quality exceeded my expectations completely.',
      vehicle: '2022 Audi A4'
    }
  ];

  // Stats data
  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: FiUsers },
    { number: '200+', label: 'Service Centers', icon: FiMapPin },
    { number: '99.8%', label: 'Satisfaction Rate', icon: FiStar },
    { number: '24/7', label: 'Support Available', icon: FiClock }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <>
      <Helmet>
        <title>Premium Vehicle Service - Professional Car Care & Maintenance</title>
        <meta name="description" content="Experience premium vehicle service with our advanced booking platform. Professional technicians, genuine parts, and exceptional customer service." />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              style={{ y: y1 }}
              className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Premium
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Vehicle Service
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Experience the future of vehicle maintenance with our AI-powered platform. 
                Professional service, transparent pricing, and unmatched convenience.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Link
                  to={user ? "/book-service" : "/register"}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Book Service Now</span>
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="group flex items-center space-x-3 text-white hover:text-cyan-400 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <FiPlay className="w-5 h-5 ml-1" />
                  </div>
                  <span className="font-medium">Watch Demo</span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                className="flex flex-wrap justify-center items-center gap-8 pt-12 opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="flex items-center space-x-2 text-blue-200">
                  <FiShield className="w-5 h-5" />
                  <span className="text-sm font-medium">Certified Technicians</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <FiAward className="w-5 h-5" />
                  <span className="text-sm font-medium">Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <FiClock className="w-5 h-5" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Experience the next generation of vehicle service with cutting-edge technology 
                and uncompromising quality standards.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Join thousands of satisfied customers who trust us with their vehicles.
              </p>
            </motion.div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 lg:p-12 relative">
                    <FiQuote className="absolute top-6 left-6 w-8 h-8 text-blue-500/20" />
                    
                    <div className="text-center">
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <blockquote className="text-xl lg:text-2xl text-gray-900 dark:text-white font-medium mb-8 leading-relaxed">
                        "{testimonials[currentTestimonial].text}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div className="text-left">
                          <div className="font-bold text-gray-900 dark:text-white">
                            {testimonials[currentTestimonial].name}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {testimonials[currentTestimonial].role}
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">
                            {testimonials[currentTestimonial].vehicle}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial 
                          ? 'bg-blue-500' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Experience Premium Service?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Join thousands of satisfied customers and give your vehicle the care it deserves.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to={user ? "/book-service" : "/register"}
                  className="group px-8 py-4 bg-white text-blue-900 font-semibold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center space-x-2">
                    <span>Get Started Today</span>
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <Link
                  to="/contact"
                  className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <FiPhone className="w-5 h-5" />
                    <span>Contact Us</span>
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
