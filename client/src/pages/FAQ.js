import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  FiHelpCircle, 
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiUser,
  FiTool,
  FiCreditCard,
  FiShield,
  FiClock,
  FiPhone,
  FiMail,
  FiMessageCircle
} from 'react-icons/fi';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  const categories = [
    { id: 'all', name: 'All Questions', icon: FiHelpCircle },
    { id: 'account', name: 'Account & Profile', icon: FiUser },
    { id: 'booking', name: 'Booking Services', icon: FiTool },
    { id: 'payment', name: 'Payment & Billing', icon: FiCreditCard },
    { id: 'security', name: 'Security & Privacy', icon: FiShield },
    { id: 'support', name: 'Support & Contact', icon: FiPhone }
  ];

  const faqData = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'To create an account, click the "Register" button in the top right corner of our website. Fill in your personal information including name, email, phone number, and create a secure password. You\'ll receive a verification email to confirm your account.'
    },
    {
      id: 2,
      category: 'account',
      question: 'I forgot my password. How can I reset it?',
      answer: 'Click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. If you don\'t receive the email, check your spam folder or contact support.'
    },
    {
      id: 3,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Log into your account and go to the "Profile" section. You can update your personal information, contact details, and vehicle information. Don\'t forget to save your changes. Some changes may require email verification.'
    },
    {
      id: 4,
      category: 'booking',
      question: 'How do I book a service appointment?',
      answer: 'Navigate to "Book Service" in the main menu. Select your vehicle, choose the type of service needed, pick a convenient date and time, and select a service center. Review your booking details and confirm. You\'ll receive a confirmation email with all the details.'
    },
    {
      id: 5,
      category: 'booking',
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule appointments through your "My Bookings" page. Cancellation policies vary by service provider. Generally, you can cancel up to 24 hours before your appointment without penalty. For same-day changes, contact the service center directly.'
    },
    {
      id: 6,
      category: 'booking',
      question: 'What if I need emergency service?',
      answer: 'For emergency roadside assistance, call our 24/7 emergency hotline at +1 (555) 123-4567. We provide jump starts, tire changes, lockout assistance, and emergency towing. Emergency services are available around the clock.'
    },
    {
      id: 7,
      category: 'booking',
      question: 'How do I choose the right service center?',
      answer: 'Our platform shows service centers near your location with ratings, reviews, and specialties. Consider factors like distance, customer reviews, pricing, and services offered. You can read detailed reviews from other customers to help make your decision.'
    },
    {
      id: 8,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital wallets like Apple Pay and Google Pay. Payment can be made through our secure platform or directly at the service center.'
    },
    {
      id: 9,
      category: 'payment',
      question: 'When am I charged for services?',
      answer: 'Payment timing depends on the service provider. Some charge when you book, others charge after service completion. The payment timing is clearly displayed during the booking process. You\'ll always receive a receipt via email.'
    },
    {
      id: 10,
      category: 'payment',
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Refund policies vary by service provider and are displayed during booking. Generally, if you\'re unsatisfied with the service quality, contact the service center first. If unresolved, our customer support team can help mediate and may authorize refunds in appropriate cases.'
    },
    {
      id: 11,
      category: 'security',
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your data. Your payment information is processed through secure, PCI-compliant systems. We never store your full credit card details on our servers. Read our Privacy Policy for complete details.'
    },
    {
      id: 12,
      category: 'security',
      question: 'How do you verify service providers?',
      answer: 'All service providers undergo a thorough verification process including business license verification, insurance confirmation, and background checks. We regularly monitor service quality through customer reviews and may remove providers who don\'t meet our standards.'
    },
    {
      id: 13,
      category: 'support',
      question: 'How can I contact customer support?',
      answer: 'You can reach our customer support team via email at support@vehicleservice.com, phone at +1 (555) 123-4567, or through the live chat feature on our website. Our support hours are Monday-Friday 8AM-8PM, Saturday-Sunday 9AM-6PM.'
    },
    {
      id: 14,
      category: 'support',
      question: 'What if I have a problem with a service provider?',
      answer: 'First, try to resolve the issue directly with the service provider. If that doesn\'t work, contact our customer support team with details about the problem. We\'ll investigate and work to resolve the issue, which may include refunds or finding alternative solutions.'
    },
    {
      id: 15,
      category: 'booking',
      question: 'Do you offer mobile/on-site services?',
      answer: 'Yes, many of our service providers offer mobile services where they come to your location. This option is available for services like oil changes, battery replacement, and basic maintenance. Mobile service availability depends on your location and the type of service needed.'
    },
    {
      id: 16,
      category: 'account',
      question: 'Can I add multiple vehicles to my account?',
      answer: 'Absolutely! You can add multiple vehicles to your account in the "My Vehicles" section of your profile. For each vehicle, you can store details like make, model, year, and license plate number to make future bookings faster and easier.'
    },
    {
      id: 17,
      category: 'payment',
      question: 'Are there any hidden fees?',
      answer: 'No, we believe in transparent pricing. All fees, including service costs, taxes, and any platform fees, are clearly displayed before you confirm your booking. The price you see during booking is the price you\'ll pay.'
    },
    {
      id: 18,
      category: 'booking',
      question: 'How far in advance can I book services?',
      answer: 'You can typically book services up to 30 days in advance, though this may vary by service provider. For popular services or busy periods, we recommend booking as early as possible to secure your preferred time slot.'
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions - Vehicle Service Booking Platform</title>
        <meta name="description" content="Find answers to frequently asked questions about our vehicle service booking platform, including account management, booking services, payments, and support." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
                Find quick answers to common questions about our platform and services
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  {openItems[faq.id] ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openItems[faq.id] && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <FiHelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm 
                  ? `No questions match your search "${searchTerm}"`
                  : `No questions available in the ${categories.find(c => c.id === selectedCategory)?.name} category`
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

          {/* Contact Support */}
          <div className="mt-12 bg-primary-50 dark:bg-primary-900 rounded-lg p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Still Need Help?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@vehicleservice.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiMail className="w-4 h-4 mr-2" />
                  Email Support
                </a>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiPhone className="w-4 h-4 mr-2" />
                  Call Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
