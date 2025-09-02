import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  FiShield, 
  FiUser, 
  FiTool,
  FiCreditCard,
  FiAlertTriangle,
  FiFileText,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheckCircle
} from 'react-icons/fi';

const TermsOfService = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: FiCheckCircle,
      content: [
        "By accessing and using the Vehicle Service Booking Platform (the 'Service'), you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These Terms of Service may be updated from time to time. Your continued use of the Service constitutes acceptance of any changes."
      ]
    },
    {
      id: "definitions",
      title: "2. Definitions",
      icon: FiFileText,
      content: [
        "'Platform' refers to the Vehicle Service Booking Platform website and mobile application.",
        "'User' refers to any individual who accesses or uses our Platform.",
        "'Service Provider' refers to automotive service centers and mechanics registered on our Platform.",
        "'Booking' refers to a service appointment made through our Platform.",
        "'Services' refers to automotive maintenance and repair services offered through our Platform."
      ]
    },
    {
      id: "user-accounts",
      title: "3. User Accounts",
      icon: FiUser,
      content: [
        "You must create an account to use certain features of our Platform.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account."
      ]
    },
    {
      id: "service-bookings",
      title: "4. Service Bookings",
      icon: FiCalendar,
      content: [
        "Our Platform facilitates connections between users and service providers.",
        "All service bookings are subject to availability and confirmation by the service provider.",
        "Pricing for services is determined by the service provider and displayed at the time of booking.",
        "You agree to pay all charges associated with your bookings.",
        "Cancellation policies vary by service provider and are displayed during the booking process."
      ]
    },
    {
      id: "payments",
      title: "5. Payments and Billing",
      icon: FiCreditCard,
      content: [
        "Payment for services may be processed through our Platform or directly with the service provider.",
        "All prices are subject to applicable taxes and fees.",
        "You authorize us to charge your selected payment method for all applicable charges.",
        "Refunds are subject to the cancellation policy of the specific service provider.",
        "We reserve the right to change our pricing structure with reasonable notice."
      ]
    },
    {
      id: "service-quality",
      title: "6. Service Quality and Warranties",
      icon: FiTool,
      content: [
        "We do not directly provide automotive services but facilitate connections with service providers.",
        "Service quality and warranties are the responsibility of the individual service providers.",
        "We encourage users to review service provider ratings and reviews before booking.",
        "Any disputes regarding service quality should be addressed directly with the service provider.",
        "We may assist in resolving disputes but are not liable for service provider performance."
      ]
    },
    {
      id: "user-conduct",
      title: "7. User Conduct",
      icon: FiShield,
      content: [
        "You agree to use our Platform only for lawful purposes.",
        "You will not use the Platform to transmit harmful, offensive, or inappropriate content.",
        "You will not attempt to gain unauthorized access to our systems or other users' accounts.",
        "You will not interfere with the proper functioning of the Platform.",
        "Violation of these conduct rules may result in account suspension or termination."
      ]
    },
    {
      id: "liability",
      title: "8. Limitation of Liability",
      icon: FiAlertTriangle,
      content: [
        "Our Platform is provided 'as is' without warranties of any kind.",
        "We are not liable for any damages arising from your use of the Platform.",
        "We do not guarantee the availability, accuracy, or reliability of the Platform.",
        "Our liability is limited to the maximum extent permitted by law.",
        "You use the Platform at your own risk and discretion."
      ]
    },
    {
      id: "privacy",
      title: "9. Privacy and Data Protection",
      icon: FiShield,
      content: [
        "Your privacy is important to us. Please review our Privacy Policy for details on data collection and use.",
        "We collect and process personal information in accordance with applicable privacy laws.",
        "You consent to the collection and use of your information as described in our Privacy Policy.",
        "We implement appropriate security measures to protect your personal information.",
        "You have rights regarding your personal data as outlined in our Privacy Policy."
      ]
    },
    {
      id: "termination",
      title: "10. Termination",
      icon: FiAlertTriangle,
      content: [
        "You may terminate your account at any time by contacting us.",
        "We may terminate or suspend your account for violation of these Terms.",
        "Upon termination, your right to use the Platform ceases immediately.",
        "Termination does not affect any outstanding obligations or liabilities.",
        "Certain provisions of these Terms survive termination."
      ]
    },
    {
      id: "changes",
      title: "11. Changes to Terms",
      icon: FiFileText,
      content: [
        "We reserve the right to modify these Terms at any time.",
        "Changes will be effective immediately upon posting on the Platform.",
        "Your continued use of the Platform constitutes acceptance of modified Terms.",
        "We will notify users of significant changes via email or Platform notifications.",
        "It is your responsibility to review these Terms periodically."
      ]
    },
    {
      id: "contact",
      title: "12. Contact Information",
      icon: FiMail,
      content: [
        "If you have questions about these Terms of Service, please contact us:",
        "Email: legal@vehicleservice.com",
        "Phone: +1 (555) 123-4567",
        "Address: 123 Service Street, New York, NY 10001",
        "We will respond to inquiries within 48 hours during business days."
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - Vehicle Service Booking Platform</title>
        <meta name="description" content="Terms of Service for the Vehicle Service Booking Platform. Read our terms and conditions for using our automotive service booking platform." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Vehicle Service Booking Platform
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiFileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome to Our Platform
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  These Terms of Service govern your use of our Vehicle Service Booking Platform. 
                  Please read these terms carefully before using our services. By using our platform, 
                  you agree to be bound by these terms and conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                      <section.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {section.content.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Notice */}
          <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Questions About These Terms?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have any questions about these Terms of Service, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@vehicleservice.com"
                  className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiMail className="w-4 h-4 mr-2" />
                  Email Legal Team
                </a>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiPhone className="w-4 h-4 mr-2" />
                  Call Support
                </a>
              </div>
            </div>
          </div>

          {/* Effective Date Notice */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              These Terms of Service are effective as of {lastUpdated} and will remain in effect 
              except with respect to any changes in its provisions in the future, which will be 
              in effect immediately after being posted on this page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
