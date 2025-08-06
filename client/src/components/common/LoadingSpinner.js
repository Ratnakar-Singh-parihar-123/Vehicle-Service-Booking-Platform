import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  className = '',
  text = null,
  variant = 'default',
  fullScreen = false,
  overlay = false
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-purple-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const DefaultSpinner = () => {
    const spinnerClasses = classNames(
      'rounded-full border-2 border-current border-t-transparent',
      sizeClasses[size],
      colorClasses[color],
      className
    );

    return (
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className={spinnerClasses}
      />
    );
  };

  const GradientSpinner = () => (
    <motion.div
      variants={spinnerVariants}
      animate="animate"
      className={`${sizeClasses[size]} relative ${className}`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
      <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
    </motion.div>
  );

  const PulseSpinner = () => (
    <motion.div
      variants={pulseVariants}
      animate="animate"
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full border-2 border-current ${className}`}
    />
  );

  const renderSpinner = () => {
    switch (variant) {
      case 'gradient':
        return <GradientSpinner />;
      case 'pulse':
        return <PulseSpinner />;
      default:
        return <DefaultSpinner />;
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderSpinner()}
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
      >
        {content}
      </motion.div>
    );
  }

  if (overlay) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-40 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      >
        {content}
      </motion.div>
    );
  }

  return text ? content : renderSpinner();
};

// Enhanced Loading States for Different Components
export const PageLoader = ({ text = "Loading..." }) => (
  <LoadingSpinner
    size="lg"
    variant="gradient"
    text={text}
    fullScreen
  />
);

export const ComponentLoader = ({ text = "" }) => (
  <LoadingSpinner
    size="md"
    variant="primary"
    text={text}
    overlay
  />
);

export const ButtonLoader = () => (
  <LoadingSpinner
    size="sm"
    variant="white"
  />
);

export const InlineLoader = ({ text = "Loading..." }) => (
  <LoadingSpinner
    size="sm"
    variant="primary"
    text={text}
  />
);

export const SkeletonCard = () => (
  <div className="card-enhanced p-6 space-y-4">
    <div className="animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
