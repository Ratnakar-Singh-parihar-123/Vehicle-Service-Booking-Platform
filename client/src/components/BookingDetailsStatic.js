import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FiDownload,
  FiPrinter,
  FiCreditCard,
  FiMapPin as FiLocation
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const BookingDetailsStatic = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  // Static booking data
  const booking = {
    bookingId: 'VSB17539769557001234',
    status: 'confirmed',
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      type: 'Car',
      licensePlate: 'ABC1234'
    },
    service: {
      type: 'Oil Change',
      amount: 50,
      paymentStatus: 'pending',
      pickupType: 'service center'
    },
    schedule: {
      date: 'August 1, 2025',
      time: '09:19 PM'
    },
    serviceCenter: {
      name: 'AutoCare Plus - Downtown',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      phone: '+1234567890',
      email: 'contact@autocare.com'
    },
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+919876543210'
    }
  };

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

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Generate PDF content
      const pdfContent = generatePDFContent();

      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `booking-${booking.bookingId}.txt`;
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
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Booking Details - ${booking.bookingId}</title>
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
            background-color: #dcfce7;
            color: #166534;
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
          <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
          <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
          <div class="section-title">Booking Status</div>
          <span class="status">Confirmed</span>
        </div>

        <div class="section">
          <div class="section-title">Vehicle Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Make & Model:</span>
              <span class="value">${booking.vehicle.make} ${booking.vehicle.model}</span>
            </div>
            <div class="info-item">
              <span class="label">Year:</span>
              <span class="value">${booking.vehicle.year}</span>
            </div>
            <div class="info-item">
              <span class="label">License Plate:</span>
              <span class="value">${booking.vehicle.licensePlate}</span>
            </div>
            <div class="info-item">
              <span class="label">Vehicle Type:</span>
              <span class="value">${booking.vehicle.type}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Service Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Service Type:</span>
              <span class="value">${booking.service.type}</span>
            </div>
            <div class="info-item">
              <span class="label">Service Amount:</span>
              <span class="value">$${booking.service.amount}</span>
            </div>
            <div class="info-item">
              <span class="label">Payment Status:</span>
              <span class="value">${booking.service.paymentStatus}</span>
            </div>
            <div class="info-item">
              <span class="label">Pickup Type:</span>
              <span class="value">${booking.service.pickupType}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Schedule</div>
          <div class="info-item">
            <span class="label">Date:</span>
            <span class="value">${booking.schedule.date}</span>
          </div>
          <div class="info-item">
            <span class="label">Time:</span>
            <span class="value">${booking.schedule.time}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Service Center</div>
          <div class="info-item">
            <span class="label">Name:</span>
            <span class="value">${booking.serviceCenter.name}</span>
          </div>
          <div class="info-item">
            <span class="label">Address:</span>
            <span class="value">${booking.serviceCenter.address.street}, ${booking.serviceCenter.address.city}, ${booking.serviceCenter.address.state} ${booking.serviceCenter.address.zipCode}</span>
          </div>
          <div class="info-item">
            <span class="label">Phone:</span>
            <span class="value">${booking.serviceCenter.phone}</span>
          </div>
          <div class="info-item">
            <span class="label">Email:</span>
            <span class="value">${booking.serviceCenter.email}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Customer Information</div>
          <div class="info-item">
            <span class="label">Name:</span>
            <span class="value">${booking.customer.name}</span>
          </div>
          <div class="info-item">
            <span class="label">Email:</span>
            <span class="value">${booking.customer.email}</span>
          </div>
          <div class="info-item">
            <span class="label">Phone:</span>
            <span class="value">${booking.customer.phone}</span>
          </div>
        </div>

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
    return `
VEHICLE SERVICE BOOKING DETAILS
===============================

Booking ID: ${booking.bookingId}
Status: Confirmed
Generated: ${new Date().toLocaleString()}

VEHICLE INFORMATION
-------------------
Make & Model: ${booking.vehicle.make} ${booking.vehicle.model}
Year: ${booking.vehicle.year}
License Plate: ${booking.vehicle.licensePlate}
Vehicle Type: ${booking.vehicle.type}

SERVICE INFORMATION
-------------------
Service Type: ${booking.service.type}
Service Amount: $${booking.service.amount}
Payment Status: ${booking.service.paymentStatus}
Pickup Type: ${booking.service.pickupType}

SCHEDULE
--------
Date: ${booking.schedule.date}
Time: ${booking.schedule.time}

SERVICE CENTER
--------------
Name: ${booking.serviceCenter.name}
Address: ${booking.serviceCenter.address.street}, ${booking.serviceCenter.address.city}, ${booking.serviceCenter.address.state} ${booking.serviceCenter.address.zipCode}
Phone: ${booking.serviceCenter.phone}
Email: ${booking.serviceCenter.email}

CUSTOMER INFORMATION
--------------------
Name: ${booking.customer.name}
Email: ${booking.customer.email}
Phone: ${booking.customer.phone}

---
This document was generated from the Vehicle Service Booking Platform
For questions or support, contact us at support@vehicleservice.com
    `.trim();
  };

  const handleBack = () => {
    navigate('/my-bookings');
  };

  return (
    <>
      <Helmet>
        <title>Booking Details - {booking.bookingId} - Vehicle Service Booking</title>
        <meta name="description" content={`Details for booking ${booking.bookingId}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-4"
                >
                  <FiArrowLeft className="w-4 h-4 mr-2" />
                  Back to Bookings
                </button>
                
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Booking Details
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Booking ID: {booking.bookingId}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiPrinter className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiDownload className="w-4 h-4 mr-2" />
                  {isDownloading ? 'Downloading...' : 'Download'}
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-primary-600 bg-primary-100 dark:bg-primary-900 dark:text-primary-200">
                <FiCheckCircle className="w-4 h-4 mr-2" />
                Confirmed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FiTruck className="w-5 h-5 mr-2 text-primary-600" />
                    Vehicle Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Make & Model</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle.make} {booking.vehicle.model}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Year</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle.year}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Vehicle Type</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">License Plate</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle.licensePlate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FiSettings className="w-5 h-5 mr-2 text-primary-600" />
                    Service Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Service Type</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.service.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Service Amount</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${booking.service.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Status</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-warning-600 bg-warning-100 dark:bg-warning-900 dark:text-warning-200">
                        <FiCreditCard className="w-4 h-4 mr-1" />
                        {booking.service.paymentStatus.charAt(0).toUpperCase() + booking.service.paymentStatus.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Pickup Type</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                        {booking.service.pickupType.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Schedule Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Schedule
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{booking.schedule.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiClock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{booking.schedule.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Center */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Service Center
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiLocation className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {booking.serviceCenter.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {booking.serviceCenter.address.street}<br />
                        {booking.serviceCenter.address.city}, {booking.serviceCenter.address.state} {booking.serviceCenter.address.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.serviceCenter.phone}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.serviceCenter.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Customer Information
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <FiUser className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {booking.customer.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.customer.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.customer.phone}
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

export default BookingDetailsStatic;
