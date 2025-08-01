import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FiShield,
  FiEye,
  FiLock,
  FiDatabase,
  FiUsers,
  FiSettings,
  FiAlertTriangle,
  FiFileText,
  FiMail,
  FiPhone,
  FiGlobe,
  FiCheckCircle,
  FiUserCheck
} from 'react-icons/fi';
import { MdCookie } from 'react-icons/md';

const PrivacyPolicy = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: FiFileText,
      content: [
        "This Privacy Policy describes how Vehicle Service Booking Platform ('we', 'our', or 'us') collects, uses, and protects your personal information when you use our platform.",
        "We are committed to protecting your privacy and ensuring the security of your personal data.",
        "This policy applies to all users of our platform, including customers, service providers, and visitors to our website.",
        "By using our platform, you consent to the collection and use of your information as described in this policy."
      ]
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      icon: FiDatabase,
      content: [
        "Personal Information: Name, email address, phone number, postal address, and payment information.",
        "Vehicle Information: Make, model, year, license plate number, and service history.",
        "Account Information: Username, password (encrypted), profile preferences, and account settings.",
        "Usage Data: How you interact with our platform, pages visited, features used, and time spent.",
        "Device Information: IP address, browser type, operating system, and device identifiers.",
        "Location Data: GPS coordinates when using location-based services (with your permission).",
        "Communication Data: Messages, reviews, and other communications through our platform."
      ]
    },
    {
      id: "how-we-collect",
      title: "3. How We Collect Information",
      icon: FiEye,
      content: [
        "Directly from you when you create an account, book services, or contact us.",
        "Automatically through cookies, web beacons, and similar technologies.",
        "From service providers when they update service records or communicate with you.",
        "From third-party services like payment processors and mapping services.",
        "Through your device when you use our mobile application.",
        "From publicly available sources to verify business information."
      ]
    },
    {
      id: "how-we-use",
      title: "4. How We Use Your Information",
      icon: FiSettings,
      content: [
        "To provide and maintain our platform services.",
        "To process bookings, payments, and communicate with service providers.",
        "To send you important updates, confirmations, and service notifications.",
        "To improve our platform, develop new features, and enhance user experience.",
        "To prevent fraud, ensure security, and comply with legal obligations.",
        "To provide customer support and respond to your inquiries.",
        "To send marketing communications (with your consent) about relevant services."
      ]
    },
    {
      id: "information-sharing",
      title: "5. Information Sharing and Disclosure",
      icon: FiUsers,
      content: [
        "Service Providers: We share necessary information with automotive service centers to fulfill your bookings.",
        "Payment Processors: Financial information is shared with secure payment processors to process transactions.",
        "Legal Requirements: We may disclose information when required by law or to protect our rights.",
        "Business Transfers: Information may be transferred in connection with mergers or acquisitions.",
        "Consent: We may share information with your explicit consent for specific purposes.",
        "We do not sell, rent, or trade your personal information to third parties for marketing purposes."
      ]
    },
    {
      id: "data-security",
      title: "6. Data Security",
      icon: FiLock,
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All sensitive data is encrypted both in transit and at rest using advanced encryption protocols.",
        "Access to personal information is restricted to authorized personnel only.",
        "We regularly monitor our systems for security vulnerabilities and threats.",
        "Payment information is processed through PCI DSS compliant payment processors.",
        "We conduct regular security audits and maintain incident response procedures."
      ]
    },
    {
      id: "cookies",
      title: "7. Cookies and Tracking Technologies",
      icon: MdCookie,
      content: [
        "We use cookies to enhance your experience and provide personalized services.",
        "Essential cookies are necessary for platform functionality and cannot be disabled.",
        "Analytics cookies help us understand how users interact with our platform.",
        "Marketing cookies may be used to show relevant advertisements (with your consent).",
        "You can manage cookie preferences through your browser settings.",
        "Disabling certain cookies may limit some platform functionality."
      ]
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      icon: FiDatabase,
      content: [
        "We retain personal information only as long as necessary for the purposes outlined in this policy.",
        "Account information is retained while your account is active and for a reasonable period after closure.",
        "Service records may be retained longer for warranty, legal, and business purposes.",
        "Marketing data is retained until you opt out or as required by law.",
        "We regularly review and delete unnecessary personal information.",
        "Some information may be retained in anonymized form for analytics purposes."
      ]
    },
    {
      id: "your-rights",
      title: "9. Your Privacy Rights",
      icon: FiUserCheck,
      content: [
        "Access: You can request access to the personal information we hold about you.",
        "Correction: You can request correction of inaccurate or incomplete information.",
        "Deletion: You can request deletion of your personal information (subject to legal requirements).",
        "Portability: You can request a copy of your data in a portable format.",
        "Opt-out: You can opt out of marketing communications at any time.",
        "Withdraw Consent: You can withdraw consent for data processing where applicable."
      ]
    },
    {
      id: "third-party-services",
      title: "10. Third-Party Services",
      icon: FiGlobe,
      content: [
        "Our platform integrates with third-party services like payment processors and mapping services.",
        "These services have their own privacy policies that govern their data practices.",
        "We carefully select third-party partners who maintain appropriate privacy standards.",
        "We are not responsible for the privacy practices of third-party websites or services.",
        "We encourage you to review the privacy policies of any third-party services you use."
      ]
    },
    {
      id: "children-privacy",
      title: "11. Children's Privacy",
      icon: FiShield,
      content: [
        "Our platform is not intended for use by children under the age of 13.",
        "We do not knowingly collect personal information from children under 13.",
        "If we become aware that we have collected information from a child under 13, we will delete it promptly.",
        "Parents or guardians who believe their child has provided information should contact us immediately.",
        "Users between 13 and 18 should have parental consent before using our platform."
      ]
    },
    {
      id: "international-transfers",
      title: "12. International Data Transfers",
      icon: FiGlobe,
      content: [
        "Your information may be transferred to and processed in countries other than your own.",
        "We ensure appropriate safeguards are in place for international data transfers.",
        "We comply with applicable data protection laws regarding cross-border transfers.",
        "Standard contractual clauses or adequacy decisions may be used for transfers.",
        "You consent to such transfers by using our platform."
      ]
    },
    {
      id: "policy-changes",
      title: "13. Changes to This Policy",
      icon: FiAlertTriangle,
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices.",
        "We will notify you of significant changes via email or platform notifications.",
        "The updated policy will be posted on our platform with a new effective date.",
        "Your continued use of the platform after changes constitutes acceptance of the updated policy.",
        "We encourage you to review this policy periodically."
      ]
    },
    {
      id: "contact-us",
      title: "14. Contact Us",
      icon: FiMail,
      content: [
        "If you have questions about this Privacy Policy or our data practices, please contact us:",
        "Email: privacy@vehicleservice.com",
        "Phone: +1 (555) 123-4567",
        "Address: 123 Service Street, New York, NY 10001",
        "Data Protection Officer: dpo@vehicleservice.com",
        "We will respond to privacy inquiries within 30 days."
      ]
    }
  ];

  const dataTypes = [
    {
      icon: FiUserCheck,
      title: "Personal Data",
      description: "Name, email, phone, address",
      examples: ["Contact information", "Account credentials", "Profile data"]
    },
    {
      icon: FiSettings,
      title: "Vehicle Data",
      description: "Vehicle details and service history",
      examples: ["Make, model, year", "License plate", "Service records"]
    },
    {
      icon: FiEye,
      title: "Usage Data",
      description: "How you interact with our platform",
      examples: ["Pages visited", "Features used", "Time spent"]
    },
    {
      icon: FiLock,
      title: "Technical Data",
      description: "Device and connection information",
      examples: ["IP address", "Browser type", "Device ID"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Vehicle Service Booking Platform</title>
        <meta name="description" content="Privacy Policy for the Vehicle Service Booking Platform. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy
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
                <FiShield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Your Privacy Matters
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We are committed to protecting your privacy and being transparent about how we collect, 
                  use, and protect your personal information. This policy explains our data practices 
                  in clear, understandable terms.
                </p>
              </div>
            </div>
          </div>

          {/* Data Types Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Types of Data We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataTypes.map((type, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-3">
                    <type.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {type.description}
                  </p>
                  <ul className="space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                        <FiCheckCircle className="w-3 h-3 text-success-500 mr-2 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Sections */}
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

          {/* Your Rights Summary */}
          <div className="mt-12 bg-success-50 dark:bg-success-900 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-success-100 dark:bg-success-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUserCheck className="w-8 h-8 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Your Privacy Rights
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                You have control over your personal information
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <FiEye className="w-6 h-6 text-success-600 dark:text-success-400 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Access</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">View your data</p>
              </div>
              <div className="text-center">
                <FiSettings className="w-6 h-6 text-success-600 dark:text-success-400 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Control</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage preferences</p>
              </div>
              <div className="text-center">
                <FiShield className="w-6 h-6 text-success-600 dark:text-success-400 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Protection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure handling</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Contact our privacy team for any questions or concerns about your data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@vehicleservice.com"
                  className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiMail className="w-4 h-4 mr-2" />
                  Email Privacy Team
                </a>
                <a
                  href="mailto:dpo@vehicleservice.com"
                  className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiShield className="w-4 h-4 mr-2" />
                  Data Protection Officer
                </a>
              </div>
            </div>
          </div>

          {/* Effective Date Notice */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              This Privacy Policy is effective as of {lastUpdated} and will remain in effect 
              except with respect to any changes in its provisions in the future, which will be 
              in effect immediately after being posted on this page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
