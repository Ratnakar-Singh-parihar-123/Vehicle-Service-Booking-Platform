import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCreditCard, 
  FiDollarSign, 
  FiCalendar, 
  FiDownload,
  FiEye,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiCheck,
  FiX,
  FiShield,
  FiClock,
  FiAlertCircle,
  FiFileText,
  FiMail,
  FiPhone
} from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const PaymentCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    // Mock data
    setPaymentMethods([
      {
        id: 1,
        type: 'card',
        brand: 'Visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
        holderName: 'John Doe'
      },
      {
        id: 2,
        type: 'card',
        brand: 'Mastercard',
        last4: '8888',
        expiryMonth: 8,
        expiryYear: 2024,
        isDefault: false,
        holderName: 'John Doe'
      }
    ]);

    setPaymentHistory([
      {
        id: 1,
        amount: 89.99,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        status: 'completed',
        method: 'Visa ****4242',
        service: 'Oil Change',
        invoiceId: 'INV-001'
      },
      {
        id: 2,
        amount: 156.50,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
        status: 'completed',
        method: 'Mastercard ****8888',
        service: 'Brake Inspection',
        invoiceId: 'INV-002'
      },
      {
        id: 3,
        amount: 45.00,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        status: 'refunded',
        method: 'Visa ****4242',
        service: 'Tire Rotation',
        invoiceId: 'INV-003'
      }
    ]);

    setInvoices([
      {
        id: 'INV-001',
        amount: 89.99,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        status: 'paid',
        service: 'Oil Change',
        vehicle: '2020 Toyota Camry',
        items: [
          { description: 'Oil Change Service', quantity: 1, price: 45.99 },
          { description: 'Oil Filter', quantity: 1, price: 12.99 },
          { description: 'Labor', quantity: 1, price: 25.00 },
          { description: 'Tax', quantity: 1, price: 6.01 }
        ]
      },
      {
        id: 'INV-004',
        amount: 234.50,
        date: new Date(),
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        status: 'pending',
        service: 'Brake Service',
        vehicle: '2020 Toyota Camry',
        items: [
          { description: 'Brake Pad Replacement', quantity: 1, price: 180.00 },
          { description: 'Brake Fluid', quantity: 1, price: 25.00 },
          { description: 'Labor', quantity: 2, price: 50.00 },
          { description: 'Tax', quantity: 1, price: 19.50 }
        ]
      }
    ]);
  }, []);

  const onSubmitCard = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCard = {
        id: Date.now(),
        type: 'card',
        brand: data.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
        last4: data.cardNumber.slice(-4),
        expiryMonth: parseInt(data.expiryMonth),
        expiryYear: parseInt(data.expiryYear),
        isDefault: paymentMethods.length === 0,
        holderName: data.holderName
      };

      setPaymentMethods(prev => [...prev, newCard]);
      toast.success('Payment method added successfully!');
      setShowAddCardModal(false);
      reset();
    } catch (error) {
      toast.error('Failed to add payment method');
    }
  };

  const deletePaymentMethod = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      toast.success('Payment method deleted');
    }
  };

  const setDefaultPaymentMethod = (id) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    toast.success('Default payment method updated');
  };

  const payInvoice = async (invoiceId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setInvoices(prev => prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: 'paid' }
          : invoice
      ));
      
      toast.success('Payment processed successfully!');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'refunded':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiDollarSign },
    { id: 'methods', label: 'Payment Methods', icon: FiCreditCard },
    { id: 'history', label: 'Payment History', icon: FiClock },
    { id: 'invoices', label: 'Invoices', icon: FiFileText }
  ];

  const totalSpent = paymentHistory
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = invoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <>
      <Helmet>
        <title>Payment Center - Vehicle Service</title>
        <meta name="description" content="Manage your payments, invoices, and payment methods securely." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Payment Center
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your payments, invoices, and payment methods
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    ${totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <FiDollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Payments</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    ${pendingAmount.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <FiClock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Payment Methods</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {paymentMethods.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FiCreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
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
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {paymentHistory.slice(0, 3).map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                              <FiDollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{payment.service}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {payment.date.toLocaleDateString()} • {payment.method}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${payment.amount.toFixed(2)}
                            </p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                              {payment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {pendingAmount > 0 && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <FiAlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <div>
                          <h4 className="font-medium text-orange-900 dark:text-orange-100">
                            Outstanding Balance
                          </h4>
                          <p className="text-sm text-orange-800 dark:text-orange-200">
                            You have ${pendingAmount.toFixed(2)} in pending payments
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'methods' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Payment Methods
                    </h3>
                    <button
                      onClick={() => setShowAddCardModal(true)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                    >
                      <FiPlus className="w-4 h-4" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ y: -2 }}
                        className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl p-6 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold">{method.brand}</span>
                            {method.isDefault && (
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-xl font-mono mb-4">
                            •••• •••• •••• {method.last4}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm opacity-80">{method.holderName}</p>
                              <p className="text-sm opacity-80">
                                {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!method.isDefault && (
                                <button
                                  onClick={() => setDefaultPaymentMethod(method.id)}
                                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                  title="Set as default"
                                >
                                  <FiCheck className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => deletePaymentMethod(method.id)}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                title="Delete card"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Payment History
                  </h3>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                            <FiDollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{payment.service}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {payment.date.toLocaleDateString()} • {payment.method}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Invoice: {payment.invoiceId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            ${payment.amount.toFixed(2)}
                          </p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                          <div className="mt-2">
                            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm">
                              <FiDownload className="w-4 h-4 inline mr-1" />
                              Receipt
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'invoices' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Invoices
                  </h3>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {invoice.id} - {invoice.service}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {invoice.vehicle} • Due: {invoice.dueDate.toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${invoice.amount.toFixed(2)}
                            </p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm flex items-center space-x-1"
                          >
                            <FiEye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm flex items-center space-x-1">
                            <FiDownload className="w-4 h-4" />
                            <span>Download PDF</span>
                          </button>
                          {invoice.status === 'pending' && (
                            <button
                              onClick={() => payInvoice(invoice.id)}
                              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Card Modal */}
        <AnimatePresence>
          {showAddCardModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setShowAddCardModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Add Payment Method
                      </h2>
                      <button
                        onClick={() => setShowAddCardModal(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmitCard)} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        {...register('holderName', { required: 'Cardholder name is required' })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-gray-700 dark:text-gray-200"
                        placeholder="Enter your name"
                      />
                      {errors.holderName && (
                        <p className="mt-1 text-sm text-red-600">{errors.holderName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number *
                      </label>
                      <input
                        {...register('cardNumber', { 
                          required: 'Card number is required',
                          pattern: {
                            value: /^[0-9]{16}$/,
                            message: 'Please enter a valid 16-digit card number'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-gray-700 dark:text-gray-200"
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Month *
                        </label>
                        <select
                          {...register('expiryMonth', { required: 'Expiry month is required' })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-gray-700 dark:text-gray-200"
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {(i + 1).toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        {errors.expiryMonth && (
                          <p className="mt-1 text-sm text-red-600">{errors.expiryMonth.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Year *
                        </label>
                        <select
                          {...register('expiryYear', { required: 'Expiry year is required' })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-gray-700 dark:text-gray-200"
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        {errors.expiryYear && (
                          <p className="mt-1 text-sm text-red-600">{errors.expiryYear.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV *
                      </label>
                      <input
                        {...register('cvv', { 
                          required: 'CVV is required',
                          pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: 'Please enter a valid CVV'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-gray-700 dark:text-gray-200"
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                      )}
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <FiShield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            Secure Payment
                          </h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                            Your payment information is encrypted and secure. We never store your full card details.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddCardModal(false)}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Add Card
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Invoice Details Modal */}
        <AnimatePresence>
          {selectedInvoice && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setSelectedInvoice(null)}
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
                        Invoice {selectedInvoice.id}
                      </h2>
                      <button
                        onClick={() => setSelectedInvoice(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Service Details</h3>
                        <p className="text-gray-600 dark:text-gray-400">{selectedInvoice.service}</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedInvoice.vehicle}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Invoice Details</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Date: {selectedInvoice.date.toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Due: {selectedInvoice.dueDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                              Description
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                              Qty
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {selectedInvoice.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                {item.description}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                                {item.quantity}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                                ${item.price.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <td colSpan="2" className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                              Total
                            </td>
                            <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white text-right">
                              ${selectedInvoice.amount.toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="flex items-center justify-end space-x-4 mt-6">
                      <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                        <FiDownload className="w-4 h-4" />
                        <span>Download PDF</span>
                      </button>
                      {selectedInvoice.status === 'pending' && (
                        <button
                          onClick={() => {
                            payInvoice(selectedInvoice.id);
                            setSelectedInvoice(null);
                          }}
                          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PaymentCenter;
