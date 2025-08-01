const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer is required']
  },
  serviceCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCenter',
    required: [true, 'Service center is required']
  },
  services: [{
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative']
    },
    finalPrice: {
      type: Number,
      required: true,
      min: [0, 'Final price cannot be negative']
    }
  }],
  vehicle: {
    make: {
      type: String,
      required: [true, 'Vehicle make is required'],
      trim: true
    },
    model: {
      type: String,
      required: [true, 'Vehicle model is required'],
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'Vehicle year is required'],
      min: [1900, 'Invalid vehicle year'],
      max: [new Date().getFullYear() + 1, 'Invalid vehicle year']
    },
    type: {
      type: String,
      required: [true, 'Vehicle type is required'],
      enum: ['Car', 'Motorcycle', 'Truck', 'SUV', 'Van', 'Bus']
    },
    licensePlate: {
      type: String,
      required: [true, 'License plate is required'],
      trim: true,
      uppercase: true
    },
    color: {
      type: String,
      trim: true
    },
    mileage: {
      type: Number,
      min: [0, 'Mileage cannot be negative']
    }
  },
  scheduledDateTime: {
    type: Date,
    required: [true, 'Scheduled date and time is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Scheduled date must be in the future'
    }
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ['service_center', 'customer_location'],
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    instructions: {
      type: String,
      maxlength: [500, 'Instructions cannot exceed 500 characters']
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'wallet'],
    default: 'cash'
  },
  notes: {
    customer: {
      type: String,
      maxlength: [1000, 'Customer notes cannot exceed 1000 characters']
    },
    serviceCenter: {
      type: String,
      maxlength: [1000, 'Service center notes cannot exceed 1000 characters']
    },
    internal: {
      type: String,
      maxlength: [1000, 'Internal notes cannot exceed 1000 characters']
    }
  },
  timeline: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String
  }],
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    review: {
      type: String,
      maxlength: [1000, 'Review cannot exceed 1000 characters']
    },
    reviewDate: Date
  },
  estimatedCompletionTime: {
    type: Date
  },
  actualCompletionTime: {
    type: Date
  },
  cancellationReason: {
    type: String,
    maxlength: [500, 'Cancellation reason cannot exceed 500 characters']
  },
  remindersSent: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ customer: 1 });
bookingSchema.index({ serviceCenter: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ scheduledDateTime: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ createdAt: -1 });

// Pre-save middleware to generate booking ID
bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.bookingId = `VSB${Date.now()}${(count + 1).toString().padStart(4, '0')}`;
    
    // Add initial timeline entry
    this.timeline.push({
      status: 'pending',
      timestamp: new Date(),
      notes: 'Booking created'
    });
  }
  next();
});

// Method to update status
bookingSchema.methods.updateStatus = function(newStatus, updatedBy, notes) {
  this.status = newStatus;
  this.timeline.push({
    status: newStatus,
    timestamp: new Date(),
    updatedBy: updatedBy,
    notes: notes
  });
  
  if (newStatus === 'completed') {
    this.actualCompletionTime = new Date();
  }
  
  return this.save();
};

// Method to add rating
bookingSchema.methods.addRating = function(score, review) {
  this.rating = {
    score: score,
    review: review,
    reviewDate: new Date()
  };
  return this.save();
};

// Virtual for booking duration
bookingSchema.virtual('duration').get(function() {
  if (this.actualCompletionTime && this.scheduledDateTime) {
    return this.actualCompletionTime - this.scheduledDateTime;
  }
  return null;
});

// Static method to get bookings by date range
bookingSchema.statics.getBookingsByDateRange = function(startDate, endDate, filters = {}) {
  const query = {
    scheduledDateTime: {
      $gte: startDate,
      $lte: endDate
    }
  };
  
  if (filters.serviceCenter) {
    query.serviceCenter = filters.serviceCenter;
  }
  
  if (filters.status) {
    query.status = filters.status;
  }
  
  return this.find(query)
    .populate('customer', 'firstName lastName email phone')
    .populate('serviceCenter', 'name address contact')
    .populate('services.service', 'name category')
    .sort({ scheduledDateTime: 1 });
};

// Static method to get revenue statistics
bookingSchema.statics.getRevenueStats = function(startDate, endDate, serviceCenterId) {
  const matchQuery = {
    createdAt: { $gte: startDate, $lte: endDate },
    status: { $in: ['completed', 'in_progress'] },
    paymentStatus: 'paid'
  };
  
  if (serviceCenterId) {
    matchQuery.serviceCenter = mongoose.Types.ObjectId(serviceCenterId);
  }
  
  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalAmount' },
        totalBookings: { $sum: 1 },
        averageBookingValue: { $avg: '$totalAmount' }
      }
    }
  ]);
};

module.exports = mongoose.model('Booking', bookingSchema);
