import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutMe from '../components/sections/AboutMe';

const AboutMeDemo = () => {
  return (
    <>
      <Helmet>
        <title>About Me - Demo Component</title>
        <meta name="description" content="Responsive About Me section component demo with animations and dark mode support" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Demo Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container-responsive py-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                About Me Component Demo
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A responsive, animated About Me section with dark mode support, built with React, Tailwind CSS, and Framer Motion.
              </p>
            </div>
          </div>
        </div>

        {/* About Me Component */}
        <AboutMe />

        {/* Demo Footer */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container-responsive py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Component Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📱 Fully Responsive</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimized for mobile, tablet, and desktop devices
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌙 Dark Mode</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Seamless light and dark theme support
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">✨ Animations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Smooth scroll-triggered animations with Framer Motion
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎨 Modern Design</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Clean UI with gradients and glassmorphism effects
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔧 Customizable</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Easy to modify content, skills, and styling
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚡ Performance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimized animations and efficient rendering
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMeDemo;
