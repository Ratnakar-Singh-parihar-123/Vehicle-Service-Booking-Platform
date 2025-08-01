const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: [
      'Oil Change',
      'Brake Service',
      'Engine Repair',
      'Transmission Service',
      'AC Service',
      'Battery Service',
      'Tire Service',
      'General Maintenance',
      'Electrical Service',
      'Body Work',
      'Inspection',
      'Emergency Service'
    ]
  },
  basePrice: {
    type: Number,
    required: [true, 'Base price is required'],
    min: [0, 'Price cannot be negative']
  },
  estimatedDuration: {
    type: Number, // in minutes
    required: [true, 'Estimated duration is required'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  vehicleTypes: [{
    type: String,
    enum: ['Car', 'Motorcycle', 'Truck', 'SUV', 'Van', 'Bus']
  }],
  requirements: [{
    type: String,
    maxlength: [200, 'Requirement cannot exceed 200 characters']
  }],
  includedItems: [{
    type: String,
    maxlength: [200, 'Included item cannot exceed 200 characters']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0
  },
  // Service center specific pricing
  serviceCenterPricing: [{
    serviceCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceCenter',
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
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  image: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better query performance
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ vehicleTypes: 1 });
serviceSchema.index({ 'serviceCenterPricing.serviceCenter': 1 });
serviceSchema.index({ tags: 1 });
serviceSchema.index({ popularity: -1 });

// Virtual for final price after discount
serviceSchema.virtual('finalPrice').get(function() {
  if (this.serviceCenterPricing && this.serviceCenterPricing.length > 0) {
    const pricing = this.serviceCenterPricing[0];
    return pricing.price - (pricing.price * pricing.discount / 100);
  }
  return this.basePrice;
});

// Method to get price for specific service center
serviceSchema.methods.getPriceForServiceCenter = function(serviceCenterId) {
  const pricing = this.serviceCenterPricing.find(
    p => p.serviceCenter.toString() === serviceCenterId.toString()
  );
  
  if (pricing) {
    const finalPrice = pricing.price - (pricing.price * pricing.discount / 100);
    return {
      basePrice: pricing.price,
      discount: pricing.discount,
      finalPrice: finalPrice,
      isAvailable: pricing.isAvailable
    };
  }
  
  return {
    basePrice: this.basePrice,
    discount: 0,
    finalPrice: this.basePrice,
    isAvailable: true
  };
};

// Method to increment popularity
serviceSchema.methods.incrementPopularity = function() {
  this.popularity += 1;
  return this.save();
};

// Static method to get popular services
serviceSchema.statics.getPopularServices = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ popularity: -1 })
    .limit(limit)
    .populate('serviceCenterPricing.serviceCenter', 'name address.city');
};

// Static method to search services
serviceSchema.statics.searchServices = function(query, filters = {}) {
  const searchQuery = {
    isActive: true,
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ]
  };

  if (filters.category) {
    searchQuery.category = filters.category;
  }

  if (filters.vehicleType) {
    searchQuery.vehicleTypes = { $in: [filters.vehicleType] };
  }

  if (filters.maxPrice) {
    searchQuery.basePrice = { $lte: filters.maxPrice };
  }

  return this.find(searchQuery)
    .populate('serviceCenterPricing.serviceCenter', 'name address.city rating')
    .sort({ popularity: -1 });
};

module.exports = mongoose.model('Service', serviceSchema);
