const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, (req, res) => {
  try {
    const { limit = 10, sort = '-createdAt', status } = req.query;

    // Generate mock booking data for dashboard
    const mockBookings = [];
    const statuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    const services = ['Oil Change', 'Brake Service', 'Engine Repair', 'AC Service', 'Battery Service'];
    const serviceCenters = ['AutoCare Plus', 'Quick Fix Motors', 'Premium Service', 'City Auto Care'];

    const numBookings = Math.min(parseInt(limit), 10);

    for (let i = 0; i < numBookings; i++) {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const randomService = services[Math.floor(Math.random() * services.length)];
      const randomCenter = serviceCenters[Math.floor(Math.random() * serviceCenters.length)];

      // Skip if status filter doesn't match
      if (status && !status.split(',').includes(randomStatus)) {
        continue;
      }

      const booking = {
        _id: `booking_${i + 1}`,
        bookingId: `VSB${Date.now()}${(i + 1).toString().padStart(4, '0')}`,
        customer: req.user._id,
        services: [{
          service: {
            _id: `service_${i + 1}`,
            name: randomService,
            category: randomService.split(' ')[0]
          },
          price: Math.floor(Math.random() * 500) + 100,
          finalPrice: Math.floor(Math.random() * 500) + 100
        }],
        serviceCenter: {
          _id: `center_${i + 1}`,
          name: randomCenter,
          address: {
            city: 'New York',
            state: 'NY'
          }
        },
        status: randomStatus,
        scheduledDateTime: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000), // Future dates
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Past dates
        totalAmount: Math.floor(Math.random() * 500) + 100
      };

      mockBookings.push(booking);
    }

    // Sort bookings
    if (sort === '-createdAt') {
      mockBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'scheduledDateTime') {
      mockBookings.sort((a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime));
    }

    res.json({
      success: true,
      data: mockBookings,
      pagination: {
        total: mockBookings.length,
        page: 1,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      vehicle,
      serviceType,
      serviceCenterId,
      preferredDate,
      preferredTime,
      pickupLocation,
      specialInstructions
    } = req.body;

    // Validate required fields
    if (!customerName || !email || !phone || !vehicle || !serviceType || !serviceCenterId || !preferredDate || !preferredTime || !pickupLocation) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Generate booking ID
    const bookingId = `VSB${Date.now()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    // Create mock booking response
    const newBooking = {
      _id: `booking_${Date.now()}`,
      bookingId,
      customer: req.user._id,
      customerName,
      email,
      phone,
      vehicle: {
        type: vehicle.type,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        licensePlate: vehicle.licensePlate?.toUpperCase()
      },
      serviceType,
      serviceCenterId,
      serviceCenter: {
        _id: serviceCenterId,
        name: getServiceCenterName(serviceCenterId),
        address: {
          city: 'New York',
          state: 'NY'
        }
      },
      scheduledDateTime: new Date(`${preferredDate}T${preferredTime}:00.000Z`),
      pickupLocation: {
        type: pickupLocation,
        instructions: specialInstructions || ''
      },
      status: 'pending',
      totalAmount: getServicePrice(serviceType),
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
});

// Helper function to get service center name
function getServiceCenterName(serviceCenterId) {
  const centers = {
    'center_1': 'AutoCare Plus - Downtown',
    'center_2': 'Quick Fix Motors - Uptown',
    'center_3': 'Premium Service - Mall Area',
    'center_4': 'City Auto Care - Suburbs'
  };
  return centers[serviceCenterId] || 'Unknown Service Center';
}

// Helper function to get service price
function getServicePrice(serviceType) {
  const prices = {
    'oil_change': 50,
    'general_maintenance': 100,
    'ac_repair': 150,
    'brake_service': 120,
    'engine_repair': 300,
    'battery_service': 80,
    'tire_service': 100,
    'transmission_service': 200,
    'electrical_service': 150,
    'body_work': 400,
    'inspection': 40,
    'emergency_service': 200
  };
  return prices[serviceType] || 100;
}

// @desc    Get available time slots
// @route   GET /api/bookings/available-slots
// @access  Private
router.get('/available-slots', protect, (req, res) => {
  try {
    const { date, serviceCenterId } = req.query;

    if (!date || !serviceCenterId) {
      return res.status(400).json({
        success: false,
        message: 'Date and service center ID are required'
      });
    }

    // Mock available time slots (in a real app, you'd check existing bookings)
    const allTimeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    // Simulate some booked slots
    const bookedSlots = ['10:00', '14:00', '16:30'];
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({
      success: true,
      data: availableSlots
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Cancel booking
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
router.patch('/:id/cancel', protect, (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason || !reason.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Cancellation reason is required'
      });
    }

    // In a real app, you would:
    // 1. Find the booking by ID
    // 2. Check if user owns the booking
    // 3. Check if booking can be cancelled (status)
    // 4. Update booking status to 'cancelled'
    // 5. Save cancellation reason and timestamp

    // Mock response
    const cancelledBooking = {
      _id: id,
      status: 'cancelled',
      cancellationReason: reason.trim(),
      cancelledAt: new Date(),
      cancelledBy: req.user._id
    };

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: cancelledBooking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, (req, res) => {
  try {
    const { id } = req.params;

    // Mock booking details
    const booking = {
      _id: id,
      bookingId: `VSB${Date.now()}1234`,
      customer: req.user._id,
      customerName: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      phone: req.user.phone || '+1234567890',
      vehicle: {
        type: 'Car',
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        licensePlate: 'ABC1234'
      },
      serviceType: 'oil_change',
      serviceCenterId: 'center_1',
      serviceCenter: {
        _id: 'center_1',
        name: 'AutoCare Plus - Downtown',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        },
        contact: {
          phone: '+1234567890',
          email: 'contact@autocare.com'
        }
      },
      scheduledDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      status: 'confirmed',
      totalAmount: 50,
      paymentStatus: 'pending',
      pickupLocation: {
        type: 'service_center',
        instructions: ''
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
