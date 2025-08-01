import React from 'react';
import classNames from 'classnames';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  text = null 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  const spinnerClasses = classNames(
    'animate-spin rounded-full border-2 border-current border-t-transparent',
    sizeClasses[size],
    colorClasses[color],
    className
  );

  if (text) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className={spinnerClasses} />
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      </div>
    );
  }

  return <div className={spinnerClasses} />;
};

export default LoadingSpinner;
