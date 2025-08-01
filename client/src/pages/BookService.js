import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiTruck,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import { bookingService } from '../services/bookingService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BookService = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedServiceCenter, setSelectedServiceCenter] = useState('');
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      customerName: user ? `${user.firstName} ${user.lastName}` : '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });

  // Watch for date and service center changes to load time slots
  const watchedDate = watch('preferredDate');
  const watchedServiceCenter = watch('serviceCenterId');

  // Vehicle types
  const vehicleTypes = [
    'Car',
    'Motorcycle',
    'Truck',
    'SUV',
    'Van',
    'Bus'
  ];

  // Service types
  const serviceTypes = [
    { value: 'oil_change', label: 'Oil Change', duration: 30, price: 50 },
    { value: 'general_maintenance', label: 'General Maintenance', duration: 60, price: 100 },
    { value: 'ac_repair', label: 'AC Repair', duration: 90, price: 150 },
    { value: 'brake_service', label: 'Brake Service', duration: 45, price: 120 },
    { value: 'engine_repair', label: 'Engine Repair', duration: 120, price: 300 },
    { value: 'battery_service', label: 'Battery Service', duration: 30, price: 80 },
    { value: 'tire_service', label: 'Tire Service', duration: 45, price: 100 },
    { value: 'transmission_service', label: 'Transmission Service', duration: 90, price: 200 },
    { value: 'electrical_service', label: 'Electrical Service', duration: 60, price: 150 },
    { value: 'body_work', label: 'Body Work', duration: 180, price: 400 },
    { value: 'inspection', label: 'Vehicle Inspection', duration: 30, price: 40 },
    { value: 'emergency_service', label: 'Emergency Service', duration: 60, price: 200 }
  ];

  // Time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load time slots when date or service center changes
  useEffect(() => {
    if (watchedDate && watchedServiceCenter) {
      loadAvailableTimeSlots(watchedDate, watchedServiceCenter);
    }
  }, [watchedDate, watchedServiceCenter]);

  const loadInitialData = async () => {
    try {
      // Load services and service centers
      const [servicesRes, centersRes] = await Promise.allSettled([
        bookingService.getServices(),
        bookingService.getServiceCenters()
      ]);

      if (servicesRes.status === 'fulfilled') {
        setServices(servicesRes.value.data.data || []);
      }

      if (centersRes.status === 'fulfilled') {
        setServiceCenters(centersRes.value.data.data || []);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Failed to load form data');
    }
  };

  const loadAvailableTimeSlots = async (date, serviceCenterId) => {
    try {
      setLoadingTimeSlots(true);
      const response = await bookingService.getAvailableTimeSlots(date, serviceCenterId);
      setAvailableTimeSlots(response.data.data || timeSlots);
    } catch (error) {
      console.error('Error loading time slots:', error);
      // Fallback to default time slots
      setAvailableTimeSlots(timeSlots);
    } finally {
      setLoadingTimeSlots(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Prepare booking data
      const bookingData = {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        vehicle: {
          type: data.vehicleType,
          make: data.vehicleMake,
          model: data.vehicleModel,
          year: data.vehicleYear,
          licensePlate: data.licensePlate
        },
        serviceType: data.serviceType,
        serviceCenterId: data.serviceCenterId,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        pickupLocation: data.pickupLocation,
        specialInstructions: data.specialInstructions
      };

      const response = await bookingService.createBooking(bookingData);

      if (response.data.success) {
        toast.success('Booking created successfully!');
        navigate('/my-bookings');
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <>
      <Helmet>
        <title>Book Service - Vehicle Service Booking</title>
        <meta name="description" content="Book your vehicle service appointment easily" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Book Vehicle Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Schedule your vehicle maintenance with our trusted service centers
            </p>
          </div>

          {/* Booking Form */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Service Booking Details
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Please fill in all required information to book your service
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiUser className="w-5 h-5 mr-2" />
                  Customer Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div>
                    <label htmlFor="customerName" className="label">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('customerName', {
                          required: 'Full name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          }
                        })}
                        type="text"
                        className={`input pl-10 ${errors.customerName ? 'input-error' : ''}`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.customerName && (
                      <p className="mt-1 text-sm text-danger-600">{errors.customerName.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="label">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-danger-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="label">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[+]?[1-9][\d]{0,15}$/,
                            message: 'Invalid phone number'
                          }
                        })}
                        type="tel"
                        className={`input pl-10 ${errors.phone ? 'input-error' : ''}`}
                        placeholder="+1234567890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-danger-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiTruck className="w-5 h-5 mr-2" />
                  Vehicle Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Vehicle Type */}
                  <div>
                    <label htmlFor="vehicleType" className="label">
                      Vehicle Type *
                    </label>
                    <select
                      {...register('vehicleType', {
                        required: 'Vehicle type is required'
                      })}
                      className={`input ${errors.vehicleType ? 'input-error' : ''}`}
                      defaultValue=""
                    >
                      <option value="" disabled>Select vehicle type</option>
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.vehicleType && (
                      <p className="mt-1 text-sm text-danger-600">{errors.vehicleType.message}</p>
                    )}
                  </div>

                  {/* Vehicle Make */}
                  <div>
                    <label htmlFor="vehicleMake" className="label">
                      Make *
                    </label>
                    <input
                      {...register('vehicleMake', {
                        required: 'Vehicle make is required'
                      })}
                      type="text"
                      className={`input ${errors.vehicleMake ? 'input-error' : ''}`}
                      placeholder="Toyota, Honda, Ford..."
                    />
                    {errors.vehicleMake && (
                      <p className="mt-1 text-sm text-danger-600">{errors.vehicleMake.message}</p>
                    )}
                  </div>

                  {/* Vehicle Model */}
                  <div>
                    <label htmlFor="vehicleModel" className="label">
                      Model *
                    </label>
                    <input
                      {...register('vehicleModel', {
                        required: 'Vehicle model is required'
                      })}
                      type="text"
                      className={`input ${errors.vehicleModel ? 'input-error' : ''}`}
                      placeholder="Camry, Civic, F-150..."
                    />
                    {errors.vehicleModel && (
                      <p className="mt-1 text-sm text-danger-600">{errors.vehicleModel.message}</p>
                    )}
                  </div>

                  {/* Vehicle Year */}
                  <div>
                    <label htmlFor="vehicleYear" className="label">
                      Year *
                    </label>
                    <input
                      {...register('vehicleYear', {
                        required: 'Vehicle year is required',
                        min: {
                          value: 1990,
                          message: 'Year must be 1990 or later'
                        },
                        max: {
                          value: new Date().getFullYear() + 1,
                          message: 'Invalid year'
                        }
                      })}
                      type="number"
                      className={`input ${errors.vehicleYear ? 'input-error' : ''}`}
                      placeholder="2020"
                      min="1990"
                      max={new Date().getFullYear() + 1}
                    />
                    {errors.vehicleYear && (
                      <p className="mt-1 text-sm text-danger-600">{errors.vehicleYear.message}</p>
                    )}
                  </div>

                  {/* License Plate */}
                  <div>
                    <label htmlFor="licensePlate" className="label">
                      License Plate *
                    </label>
                    <input
                      {...register('licensePlate', {
                        required: 'License plate is required'
                      })}
                      type="text"
                      className={`input ${errors.licensePlate ? 'input-error' : ''}`}
                      placeholder="ABC-1234"
                      style={{ textTransform: 'uppercase' }}
                    />
                    {errors.licensePlate && (
                      <p className="mt-1 text-sm text-danger-600">{errors.licensePlate.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiSettings className="w-5 h-5 mr-2" />
                  Service Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Service Type */}
                  <div>
                    <label htmlFor="serviceType" className="label">
                      Service Type *
                    </label>
                    <select
                      {...register('serviceType', {
                        required: 'Service type is required'
                      })}
                      className={`input ${errors.serviceType ? 'input-error' : ''}`}
                      defaultValue=""
                    >
                      <option value="" disabled>Select service type</option>
                      {serviceTypes.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label} - ${service.price} ({service.duration} min)
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="mt-1 text-sm text-danger-600">{errors.serviceType.message}</p>
                    )}
                  </div>

                  {/* Service Center */}
                  <div>
                    <label htmlFor="serviceCenterId" className="label">
                      Service Center *
                    </label>
                    <select
                      {...register('serviceCenterId', {
                        required: 'Service center is required'
                      })}
                      className={`input ${errors.serviceCenterId ? 'input-error' : ''}`}
                      defaultValue=""
                      onChange={(e) => {
                        setValue('serviceCenterId', e.target.value);
                        setSelectedServiceCenter(e.target.value);
                      }}
                    >
                      <option value="" disabled>Select service center</option>
                      <option value="center_1">AutoCare Plus - Downtown</option>
                      <option value="center_2">Quick Fix Motors - Uptown</option>
                      <option value="center_3">Premium Service - Mall Area</option>
                      <option value="center_4">City Auto Care - Suburbs</option>
                    </select>
                    {errors.serviceCenterId && (
                      <p className="mt-1 text-sm text-danger-600">{errors.serviceCenterId.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Date and Time Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2" />
                  Preferred Date & Time
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="preferredDate" className="label">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('preferredDate', {
                          required: 'Preferred date is required'
                        })}
                        type="date"
                        className={`input pl-10 ${errors.preferredDate ? 'input-error' : ''}`}
                        min={getMinDate()}
                        max={getMaxDate()}
                        onChange={(e) => {
                          setValue('preferredDate', e.target.value);
                          setSelectedDate(e.target.value);
                        }}
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="mt-1 text-sm text-danger-600">{errors.preferredDate.message}</p>
                    )}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label htmlFor="preferredTime" className="label">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiClock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        {...register('preferredTime', {
                          required: 'Preferred time is required'
                        })}
                        className={`input pl-10 ${errors.preferredTime ? 'input-error' : ''}`}
                        defaultValue=""
                        disabled={!selectedDate || !selectedServiceCenter || loadingTimeSlots}
                      >
                        <option value="" disabled>
                          {loadingTimeSlots ? 'Loading times...' : 'Select time slot'}
                        </option>
                        {availableTimeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      {loadingTimeSlots && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <LoadingSpinner size="sm" />
                        </div>
                      )}
                    </div>
                    {errors.preferredTime && (
                      <p className="mt-1 text-sm text-danger-600">{errors.preferredTime.message}</p>
                    )}
                    {!selectedDate || !selectedServiceCenter ? (
                      <p className="mt-1 text-sm text-gray-500">
                        Please select date and service center first
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Pickup Location */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2" />
                  Pickup Location
                </h3>

                <div className="space-y-4">
                  {/* Pickup Type */}
                  <div>
                    <label className="label">
                      Pickup Option *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          {...register('pickupLocation', {
                            required: 'Pickup option is required'
                          })}
                          type="radio"
                          value="service_center"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                          Drop off at service center
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          {...register('pickupLocation')}
                          type="radio"
                          value="customer_location"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                          Pickup from my location (additional charges may apply)
                        </span>
                      </label>
                    </div>
                    {errors.pickupLocation && (
                      <p className="mt-1 text-sm text-danger-600">{errors.pickupLocation.message}</p>
                    )}
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label htmlFor="specialInstructions" className="label">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      {...register('specialInstructions')}
                      rows={3}
                      className="input"
                      placeholder="Any special instructions for the service technician..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiCheckCircle className="w-4 h-4 text-success-500" />
                    <span>All information will be verified before confirmation</span>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="btn-primary flex items-center"
                    >
                      {isSubmitting || loading ? (
                        <>
                          <LoadingSpinner size="sm" color="white" className="mr-2" />
                          Booking...
                        </>
                      ) : (
                        <>
                          <FiCheckCircle className="w-4 h-4 mr-2" />
                          Book Service
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Information Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <FiAlertCircle className="w-6 h-6 text-primary-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Important Information
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Booking confirmation will be sent via email</li>
                <li>• Please arrive 15 minutes before your appointment</li>
                <li>• Bring your vehicle registration and insurance documents</li>
                <li>• Cancellations must be made 24 hours in advance</li>
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <FiClock className="w-6 h-6 text-success-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Service Hours
                </h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookService;
