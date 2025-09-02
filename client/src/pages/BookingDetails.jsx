import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiTruck,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiDownload,
  FiPrinter
} from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import { bookingService } from '../services/bookingService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch booking details
  // const fetchBookingDetails = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const response = await bookingService.getBookingById(id);

  //     if (response.data.success) {
  //       setBooking(response.data.data);
  //     } else {
  //       throw new Error(response.data.message || 'Failed to fetch booking details');
  //     }
  //   } catch (error) {
  //     console.error('Fetch booking details error:', error);
  //     setError('Failed to load booking details');
  //     toast.error('Failed to load booking details');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'text-warning-600 bg-warning-100 dark:bg-warning-900 dark:text-warning-200',
          icon: FiClock,
          label: 'Pending'
        };
      case 'confirmed':
        return {
          color: 'text-primary-600 bg-primary-100 dark:bg-primary-900 dark:text-primary-200',
          icon: FiCheckCircle,
          label: 'Confirmed'
        };
      case 'in_progress':
        return {
          color: 'text-secondary-600 bg-secondary-100 dark:bg-secondary-900 dark:text-secondary-200',
          icon: FiSettings,
          label: 'In Progress'
        };
      case 'completed':
        return {
          color: 'text-success-600 bg-success-100 dark:bg-success-900 dark:text-success-200',
          icon: FiCheckCircle,
          label: 'Completed'
        };
      case 'cancelled':
        return {
          color: 'text-danger-600 bg-danger-100 dark:bg-danger-900 dark:text-danger-200',
          icon: FiXCircle,
          label: 'Cancelled'
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200',
          icon: FiAlertCircle,
          label: 'Unknown'
        };
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  // Get service type label
  const getServiceTypeLabel = (serviceType) => {
    const serviceLabels = {
      'oil_change': 'Oil Change',
      'general_maintenance': 'General Maintenance',
      'ac_repair': 'AC Repair',
      'brake_service': 'Brake Service',
      'engine_repair': 'Engine Repair',
      'battery_service': 'Battery Service',
      'tire_service': 'Tire Service',
      'transmission_service': 'Transmission Service',
      'electrical_service': 'Electrical Service',
      'body_work': 'Body Work',
      'inspection': 'Vehicle Inspection',
      'emergency_service': 'Emergency Service'
    };
    return serviceLabels[serviceType] || serviceType;
  };

  // Print function
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      toast.error('Please allow popups to enable printing');
      return;
    }

    // Generate print-friendly HTML
    const printContent = generatePrintHTML();

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };

    toast.success('Print dialog opened');
  };

  // Download function
  const handleDownload = async () => {
    if (!booking) {
      toast.error('No booking data available');
      return;
    }

    try {
      setIsDownloading(true);

      // Generate PDF content (in a real app, you'd use a library like jsPDF)
      const pdfContent = generatePDFContent();

      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `booking-${booking.bookingId || id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
      toast.success('Booking details downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download booking details');
    } finally {
      setIsDownloading(false);
    }
  };

  // Generate print-friendly HTML
  const generatePrintHTML = () => {
    if (!booking) return '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Booking Details - ${booking.bookingId || id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          .info-item {
            margin-bottom: 8px;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .value {
            margin-left: 10px;
          }
          .status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
          }
          .status-confirmed {
            background-color: #dcfce7;
            color: #166534;
          }
          .status-pending {
            background-color: #fef3c7;
            color: #92400e;
          }
          .status-cancelled {
            background-color: #fee2e2;
            color: #991b1b;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Vehicle Service Booking Details</h1>
          <p><strong>Booking ID:</strong> ${booking.bookingId || id}</p>
          <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
          <div class="section-title">Booking Status</div>
          <span class="status status-${booking.status?.toLowerCase() || 'pending'}">
            ${booking.status || 'Pending'}
          </span>
        </div>

        <div class="section">
          <div class="section-title">Vehicle Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Make & Model:</span>
              <span class="value">${booking.vehicle?.make || 'N/A'} ${booking.vehicle?.model || ''}</span>
            </div>
            <div class="info-item">
              <span class="label">Year:</span>
              <span class="value">${booking.vehicle?.year || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">License Plate:</span>
              <span class="value">${booking.vehicle?.licensePlate || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Vehicle Type:</span>
              <span class="value">${booking.vehicle?.type || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Service Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Service Type:</span>
              <span class="value">${booking.serviceType || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Service Date:</span>
              <span class="value">${booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Service Time:</span>
              <span class="value">${booking.serviceTime || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="label">Estimated Cost:</span>
              <span class="value">$${booking.estimatedCost || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Service Center</div>
          <div class="info-item">
            <span class="label">Name:</span>
            <span class="value">${booking.serviceCenter?.name || 'N/A'}</span>
          </div>
          <div class="info-item">
            <span class="label">Address:</span>
            <span class="value">${booking.serviceCenter?.address || 'N/A'}</span>
          </div>
          <div class="info-item">
            <span class="label">Phone:</span>
            <span class="value">${booking.serviceCenter?.phone || 'N/A'}</span>
          </div>
          <div class="info-item">
            <span class="label">Email:</span>
            <span class="value">${booking.serviceCenter?.email || 'N/A'}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Customer Information</div>
          <div class="info-item">
            <span class="label">Name:</span>
            <span class="value">${booking.customer?.name || user?.firstName + ' ' + user?.lastName || 'N/A'}</span>
          </div>
          <div class="info-item">
            <span class="label">Email:</span>
            <span class="value">${booking.customer?.email || user?.email || 'N/A'}</span>
          </div>
          <div class="info-item">
            <span class="label">Phone:</span>
            <span class="value">${booking.customer?.phone || user?.phone || 'N/A'}</span>
          </div>
        </div>

        ${booking.notes ? `
        <div class="section">
          <div class="section-title">Additional Notes</div>
          <p>${booking.notes}</p>
        </div>
        ` : ''}

        <div class="section" style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
          <p>This document was generated from the Vehicle Service Booking Platform</p>
          <p>For questions or support, contact us at support@vehicleservice.com</p>
        </div>
      </body>
      </html>
    `;
  };

  // Generate PDF content (simplified text version)
  const generatePDFContent = () => {
    if (!booking) return '';

    return `
VEHICLE SERVICE BOOKING DETAILS
===============================

Booking ID: ${booking.bookingId || id}
Status: ${booking.status || 'Pending'}
Generated: ${new Date().toLocaleString()}

VEHICLE INFORMATION
-------------------
Make & Model: ${booking.vehicle?.make || 'N/A'} ${booking.vehicle?.model || ''}
Year: ${booking.vehicle?.year || 'N/A'}
License Plate: ${booking.vehicle?.licensePlate || 'N/A'}
Vehicle Type: ${booking.vehicle?.type || 'N/A'}

SERVICE INFORMATION
-------------------
Service Type: ${booking.serviceType || 'N/A'}
Service Date: ${booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'N/A'}
Service Time: ${booking.serviceTime || 'N/A'}
Estimated Cost: $${booking.estimatedCost || 'N/A'}

SERVICE CENTER
--------------
Name: ${booking.serviceCenter?.name || 'N/A'}
Address: ${booking.serviceCenter?.address || 'N/A'}
Phone: ${booking.serviceCenter?.phone || 'N/A'}
Email: ${booking.serviceCenter?.email || 'N/A'}

CUSTOMER INFORMATION
--------------------
Name: ${booking.customer?.name || user?.firstName + ' ' + user?.lastName || 'N/A'}
Email: ${booking.customer?.email || user?.email || 'N/A'}
Phone: ${booking.customer?.phone || user?.phone || 'N/A'}

${booking.notes ? `
ADDITIONAL NOTES
----------------
${booking.notes}
` : ''}

---
This document was generated from the Vehicle Service Booking Platform
For questions or support, contact us at support@vehicleservice.com
    `.trim();
  };

  // Load booking details on component mount
 useEffect(() => {
  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingService.getBookingById(id);
      if (response.data.success) {
        setBooking(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch booking details');
      }
    } catch (error) {
      console.error('Fetch booking details error:', error);
      setError('Failed to load booking details');
      toast.error('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchBookingDetails();
  }
}, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading booking details..." />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FiAlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'The booking you are looking for does not exist or you do not have permission to view it.'}
            </p>
            <Link
              to="/my-bookings"
              className="btn-primary inline-flex items-center"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to My Bookings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(booking.status);
  const StatusIcon = statusInfo.icon;
  const dateTime = formatDateTime(booking.scheduledDateTime || booking.createdAt);

  return (
    <>
      <Helmet>
        <title>Booking Details - {booking.bookingId} - Vehicle Service Booking</title>
        <meta name="description" content={`Details for booking ${booking.bookingId}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <button
                onClick={() => navigate('/my-bookings')}
                className="btn-outline flex items-center mr-4"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to Bookings
              </button>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Booking Details
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Booking ID: {booking.bookingId}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrint}
                  className="btn-outline flex items-center"
                  disabled={!booking}
                >
                  <FiPrinter className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button
                  onClick={handleDownload}
                  className="btn-outline flex items-center"
                  disabled={!booking || isDownloading}
                >
                  <FiDownload className="w-4 h-4 mr-2" />
                  {isDownloading ? 'Downloading...' : 'Download'}
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
                <StatusIcon className="w-4 h-4 mr-2" />
                {statusInfo.label}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle Information */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FiTruck className="w-5 h-5 mr-2" />
                    Vehicle Information
                  </h3>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Make & Model</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle?.make} {booking.vehicle?.model}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Year</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle?.year}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle?.type || 'Car'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">License Plate</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle?.licensePlate || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FiSettings className="w-5 h-5 mr-2" />
                    Service Details
                  </h3>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Type</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {getServiceTypeLabel(booking.serviceType)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${booking.totalAmount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                        {booking.paymentStatus || 'Pending'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pickup Type</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                        {booking.pickupLocation?.type?.replace('_', ' ') || 'Service Center'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Schedule Information */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Schedule
                  </h3>
                </div>
                <div className="card-body space-y-4">
                  <div className="flex items-center space-x-3">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{dateTime.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiClock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{dateTime.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Center */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Service Center
                  </h3>
                </div>
                <div className="card-body space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {booking.serviceCenter?.name || 'AutoCare Plus - Downtown'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {booking.serviceCenter?.address?.street || '123 Main St'}<br />
                        {booking.serviceCenter?.address?.city || 'New York'}, {booking.serviceCenter?.address?.state || 'NY'} {booking.serviceCenter?.address?.zipCode || '10001'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.serviceCenter?.contact?.phone || '+1234567890'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.serviceCenter?.contact?.email || 'contact@autocare.com'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Customer Information
                  </h3>
                </div>
                <div className="card-body space-y-4">
                  <div className="flex items-center space-x-3">
                    <FiUser className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {booking.customerName || `${user?.firstName} ${user?.lastName}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.email || user?.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.phone || user?.phone || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
