import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit3, 
  FiTrash2, 
  FiTruck,
  FiCalendar, 
  FiTool,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiFileText,
  FiCamera,
  FiUpload,
  FiX,
  FiSave
} from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  // Mock vehicle data
  useEffect(() => {
    const mockVehicles = [
      {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Silver',
        vin: '1HGBH41JXMN109186',
        licensePlate: 'ABC-1234',
        mileage: 45000,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        image: '/api/placeholder/300/200',
        nextService: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days from now
        lastService: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90), // 90 days ago
        serviceHistory: [
          {
            id: 1,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
            service: 'Oil Change',
            mileage: 42000,
            cost: 45.99,
            location: 'Quick Lube Center'
          },
          {
            id: 2,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180),
            service: 'Brake Inspection',
            mileage: 38000,
            cost: 89.99,
            location: 'Auto Service Pro'
          }
        ],
        documents: [
          { id: 1, name: 'Registration', type: 'PDF', uploadDate: new Date() },
          { id: 2, name: 'Insurance', type: 'PDF', uploadDate: new Date() }
        ],
        alerts: [
          { id: 1, type: 'warning', message: 'Service due in 15 days', priority: 'medium' },
          { id: 2, type: 'info', message: 'Registration expires in 3 months', priority: 'low' }
        ]
      },
      {
        id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        color: 'Blue',
        vin: '2HGFC2F59KH123456',
        licensePlate: 'XYZ-5678',
        mileage: 32000,
        fuelType: 'Gasoline',
        transmission: 'Manual',
        image: '/api/placeholder/300/200',
        nextService: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        lastService: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
        serviceHistory: [
          {
            id: 1,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
            service: 'Tire Rotation',
            mileage: 30000,
            cost: 25.99,
            location: 'Tire Express'
          }
        ],
        documents: [
          { id: 1, name: 'Registration', type: 'PDF', uploadDate: new Date() }
        ],
        alerts: []
      }
    ];

    setVehicles(mockVehicles);
  }, []);

  const onSubmit = async (data) => {
    try {
      if (showEditModal && selectedVehicle) {
        // Update existing vehicle
        setVehicles(prev => prev.map(v => 
          v.id === selectedVehicle.id 
            ? { ...v, ...data, id: selectedVehicle.id }
            : v
        ));
        toast.success('Vehicle updated successfully!');
        setShowEditModal(false);
      } else {
        // Add new vehicle
        const newVehicle = {
          ...data,
          id: Date.now(),
          serviceHistory: [],
          documents: [],
          alerts: [],
          image: '/api/placeholder/300/200'
        };
        setVehicles(prev => [...prev, newVehicle]);
        toast.success('Vehicle added successfully!');
        setShowAddModal(false);
      }
      reset();
    } catch (error) {
      toast.error('Failed to save vehicle');
    }
  };

  const deleteVehicle = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(prev => prev.filter(v => v.id !== id));
      toast.success('Vehicle deleted successfully!');
      if (selectedVehicle?.id === id) {
        setSelectedVehicle(null);
      }
    }
  };

  const openEditModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setValue('make', vehicle.make);
    setValue('model', vehicle.model);
    setValue('year', vehicle.year);
    setValue('color', vehicle.color);
    setValue('vin', vehicle.vin);
    setValue('licensePlate', vehicle.licensePlate);
    setValue('mileage', vehicle.mileage);
    setValue('fuelType', vehicle.fuelType);
    setValue('transmission', vehicle.transmission);
    setShowEditModal(true);
  };

  const getServiceStatus = (vehicle) => {
    const daysSinceLastService = Math.floor((Date.now() - vehicle.lastService) / (1000 * 60 * 60 * 24));
    const daysUntilNextService = Math.floor((vehicle.nextService - Date.now()) / (1000 * 60 * 60 * 24));

    if (daysUntilNextService < 0) {
      return { status: 'overdue', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' };
    } else if (daysUntilNextService <= 15) {
      return { status: 'due-soon', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' };
    } else {
      return { status: 'up-to-date', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' };
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiTruck },
    { id: 'service', label: 'Service History', icon: FiTool },
    { id: 'documents', label: 'Documents', icon: FiFileText },
    { id: 'alerts', label: 'Alerts', icon: FiAlertTriangle }
  ];

  return (
    <>
      <Helmet>
        <title>Vehicle Management - Vehicle Service</title>
        <meta name="description" content="Manage your vehicles, track service history, and stay on top of maintenance schedules." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Vehicle Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Manage your vehicles and track their maintenance history
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vehicle List */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Your Vehicles ({vehicles.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {vehicles.map((vehicle) => {
                    const serviceStatus = getServiceStatus(vehicle);
                    return (
                      <motion.div
                        key={vehicle.id}
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedVehicle?.id === vehicle.id 
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-r-4 border-primary-600' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <FiTruck className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {vehicle.licensePlate} • {vehicle.mileage.toLocaleString()} miles
                            </p>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${serviceStatus.bgColor} ${serviceStatus.color}`}>
                              {serviceStatus.status === 'overdue' && <FiAlertTriangle className="w-3 h-3 mr-1" />}
                              {serviceStatus.status === 'due-soon' && <FiClock className="w-3 h-3 mr-1" />}
                              {serviceStatus.status === 'up-to-date' && <FiCheckCircle className="w-3 h-3 mr-1" />}
                              {serviceStatus.status === 'overdue' ? 'Service Overdue' : 
                               serviceStatus.status === 'due-soon' ? 'Service Due Soon' : 'Up to Date'}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(vehicle);
                              }}
                              className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                            >
                              <FiEdit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteVehicle(vehicle.id);
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="lg:col-span-2">
              {selectedVehicle ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  {/* Vehicle Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <FiTruck className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {selectedVehicle.color} • {selectedVehicle.licensePlate} • {selectedVehicle.mileage.toLocaleString()} miles
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-8 px-6">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                              activeTab === tab.id
                                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                            {tab.id === 'alerts' && selectedVehicle.alerts.length > 0 && (
                              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                {selectedVehicle.alerts.length}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Vehicle Information
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">VIN:</span>
                              <span className="font-medium text-gray-900 dark:text-white">{selectedVehicle.vin}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Fuel Type:</span>
                              <span className="font-medium text-gray-900 dark:text-white">{selectedVehicle.fuelType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Transmission:</span>
                              <span className="font-medium text-gray-900 dark:text-white">{selectedVehicle.transmission}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Service Status
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Last Service:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {selectedVehicle.lastService.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Next Service:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {selectedVehicle.nextService.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'service' && (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Service History
                          </h3>
                          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                            Add Service Record
                          </button>
                        </div>
                        <div className="space-y-4">
                          {selectedVehicle.serviceHistory.map((service) => (
                            <div key={service.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-white">{service.service}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {service.date.toLocaleDateString()} • {service.mileage.toLocaleString()} miles
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <FiMapPin className="w-4 h-4 inline mr-1" />
                                    {service.location}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-gray-900 dark:text-white">
                                    ${service.cost}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'documents' && (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Documents
                          </h3>
                          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center space-x-2">
                            <FiUpload className="w-4 h-4" />
                            <span>Upload Document</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedVehicle.documents.map((doc) => (
                            <div key={doc.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                <FiFileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">{doc.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {doc.type} • Uploaded {doc.uploadDate.toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'alerts' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                          Alerts & Reminders
                        </h3>
                        {selectedVehicle.alerts.length === 0 ? (
                          <div className="text-center py-8">
                            <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">No alerts for this vehicle</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {selectedVehicle.alerts.map((alert) => (
                              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                                alert.type === 'warning' 
                                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500' 
                                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                              }`}>
                                <div className="flex items-center space-x-3">
                                  {alert.type === 'warning' ? (
                                    <FiAlertTriangle className="w-5 h-5 text-orange-600" />
                                  ) : (
                                    <FiClock className="w-5 h-5 text-blue-600" />
                                  )}
                                  <p className="text-gray-900 dark:text-white">{alert.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center h-96">
                  <div className="text-center">
                    <FiTruck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Select a Vehicle
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose a vehicle from the list to view its details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Vehicle Modal */}
        <AnimatePresence>
          {(showAddModal || showEditModal) && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  reset();
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {showEditModal ? 'Edit Vehicle' : 'Add New Vehicle'}
                      </h2>
                      <button
                        onClick={() => {
                          setShowAddModal(false);
                          setShowEditModal(false);
                          reset();
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Make *
                        </label>
                        <input
                          {...register('make', { required: 'Make is required' })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., Toyota"
                        />
                        {errors.make && (
                          <p className="mt-1 text-sm text-red-600">{errors.make.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Model *
                        </label>
                        <input
                          {...register('model', { required: 'Model is required' })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., Camry"
                        />
                        {errors.model && (
                          <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Year *
                        </label>
                        <input
                          {...register('year', { 
                            required: 'Year is required',
                            min: { value: 1900, message: 'Invalid year' },
                            max: { value: new Date().getFullYear() + 1, message: 'Invalid year' }
                          })}
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., 2020"
                        />
                        {errors.year && (
                          <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Color
                        </label>
                        <input
                          {...register('color')}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., Silver"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          VIN
                        </label>
                        <input
                          {...register('vin')}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="17-character VIN"
                          maxLength={17}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          License Plate *
                        </label>
                        <input
                          {...register('licensePlate', { required: 'License plate is required' })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., ABC-1234"
                        />
                        {errors.licensePlate && (
                          <p className="mt-1 text-sm text-red-600">{errors.licensePlate.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Mileage
                        </label>
                        <input
                          {...register('mileage', { 
                            min: { value: 0, message: 'Mileage must be positive' }
                          })}
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., 45000"
                        />
                        {errors.mileage && (
                          <p className="mt-1 text-sm text-red-600">{errors.mileage.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Fuel Type
                        </label>
                        <select
                          {...register('fuelType')}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">Select fuel type</option>
                          <option value="Gasoline">Gasoline</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Electric">Electric</option>
                          <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Transmission
                        </label>
                        <select
                          {...register('transmission')}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">Select transmission</option>
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                          <option value="CVT">CVT</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddModal(false);
                          setShowEditModal(false);
                          reset();
                        }}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                      >
                        <FiSave className="w-4 h-4" />
                        <span>{showEditModal ? 'Update Vehicle' : 'Add Vehicle'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default VehicleManagement;
