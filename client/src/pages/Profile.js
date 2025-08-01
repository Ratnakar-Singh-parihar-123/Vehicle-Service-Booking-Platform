import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit3,
  FiSave,
  FiCamera,
  FiX
} from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Profile = () => {
  const { user, updateProfile: updateAuthProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(user?.profileImage || null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileData, setProfileData] = useState(user || {});
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || ''
    }
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || ''
      };

      setProfileData(user);
      reset(userData);
    }
  }, [user, reset]);

  // Handle profile update
  const onSubmit = async (data) => {
    try {
      setSaving(true);

      // Update local profile data
      const updatedProfile = {
        ...profileData,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        profileImage: profileImagePreview, // Include the uploaded image
        address: {
          street: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        }
      };

      // Update local state
      setProfileData(updatedProfile);

      // Update auth context and persist to localStorage
      await updateAuthProfile(updatedProfile);

      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would call your API here:
      // const response = await authService.updateProfile(data);

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Simulate upload to server (in real app, upload to cloud storage)
      await uploadImageToServer(file);

      // Update profile data with new image
      const updatedProfileData = {
        ...profileData,
        profileImage: profileImagePreview
      };
      setProfileData(updatedProfileData);

      // Update auth context and persist to localStorage
      await updateAuthProfile(updatedProfileData);

      toast.success('Profile image updated successfully!');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image. Please try again.');
      // Reset preview on error
      setProfileImagePreview(user?.profileImage || null);
    } finally {
      setUploadingImage(false);
    }
  };

  // Simulate image upload to server
  const uploadImageToServer = async (file) => {
    // In a real application, you would upload to a cloud service like:
    // - AWS S3
    // - Cloudinary
    // - Firebase Storage
    // - Your own server

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful upload
        if (Math.random() > 0.1) { // 90% success rate
          resolve({
            url: URL.createObjectURL(file), // Create a local URL for demo
            filename: file.name
          });
        } else {
          reject(new Error('Upload failed'));
        }
      }, 2000); // Simulate 2 second upload time
    });
  };

  // Handle removing profile image
  const handleRemoveImage = async () => {
    try {
      setUploadingImage(true);

      // Simulate API call to remove image
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear the image
      setProfileImagePreview(null);
      setImageFile(null);

      // Update profile data
      const updatedProfileData = {
        ...profileData,
        profileImage: null
      };
      setProfileData(updatedProfileData);

      // Update auth context and persist to localStorage
      await updateAuthProfile(updatedProfileData);

      toast.success('Profile image removed successfully!');
    } catch (error) {
      console.error('Remove image error:', error);
      toast.error('Failed to remove image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Profile - Vehicle Service Booking</title>
        <meta name="description" content="Manage your profile information and settings" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account information and preferences
            </p>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Picture Section */}
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                          {profileImagePreview ? (
                            <img
                              src={profileImagePreview}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiUser className="w-16 h-16 text-gray-400" />
                          )}
                        </div>

                        {isEditing && (
                          <>
                            <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                              <FiCamera className="w-5 h-5 text-white" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={uploadingImage}
                              />
                            </label>

                            {profileImagePreview && (
                              <button
                                onClick={handleRemoveImage}
                                disabled={uploadingImage}
                                className="absolute top-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors disabled:opacity-50"
                                title="Remove image"
                              >
                                <FiX className="w-4 h-4 text-white" />
                              </button>
                            )}
                          </>
                        )}

                        {uploadingImage && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                            <LoadingSpinner size="sm" color="white" />
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {profileData?.firstName} {profileData?.lastName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {profileData?.role?.replace('_', ' ')} Account
                        </p>
                        {isEditing && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            Click camera icon to upload image
                            {profileImagePreview && <br />}
                            {profileImagePreview && "Click × to remove image"}
                          </p>
                        )}
                      </div>

                      {isEditing && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Click the camera icon to upload a new profile picture
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Form Fields Section */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* First Name */}
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              First Name *
                            </label>
                            {isEditing ? (
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <FiUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  {...register('firstName', {
                                    required: 'First name is required',
                                    minLength: {
                                      value: 2,
                                      message: 'First name must be at least 2 characters'
                                    }
                                  })}
                                  type="text"
                                  className={`w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white ${
                                    errors.firstName ? 'border-red-500' : ''
                                  }`}
                                  placeholder="John"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center space-x-3 py-2">
                                <FiUser className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-900 dark:text-white">
                                  {profileData?.firstName || 'Not provided'}
                                </span>
                              </div>
                            )}
                            {errors.firstName && (
                              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                            )}
                          </div>

                          {/* Last Name */}
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Last Name *
                            </label>
                            {isEditing ? (
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <FiUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  {...register('lastName', {
                                    required: 'Last name is required',
                                    minLength: {
                                      value: 2,
                                      message: 'Last name must be at least 2 characters'
                                    }
                                  })}
                                  type="text"
                                  className={`w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white ${
                                    errors.lastName ? 'border-red-500' : ''
                                  }`}
                                  placeholder="Doe"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center space-x-3 py-2">
                                <FiUser className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-900 dark:text-white">
                                  {profileData?.lastName || 'Not provided'}
                                </span>
                              </div>
                            )}
                            {errors.lastName && (
                              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="mt-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                          </label>
                          <div className="flex items-center space-x-3 py-2">
                            <FiMail className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">
                              {profileData?.email || 'Not provided'}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              (Cannot be changed)
                            </span>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="mt-4">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number
                          </label>
                          {isEditing ? (
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                {...register('phone', {
                                  pattern: {
                                    value: /^[+]?[1-9][\d]{0,15}$/,
                                    message: 'Invalid phone number'
                                  }
                                })}
                                type="tel"
                                className={`w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white ${
                                  errors.phone ? 'border-red-500' : ''
                                }`}
                                placeholder="+1234567890"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center space-x-3 py-2">
                              <FiPhone className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-900 dark:text-white">
                                {profileData?.phone || 'Not provided'}
                              </span>
                            </div>
                          )}
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Address Information */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Address Information
                        </h3>

                        <div className="space-y-4">
                          {/* Street Address */}
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Street Address
                            </label>
                            {isEditing ? (
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <FiMapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  {...register('address')}
                                  type="text"
                                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="123 Main Street"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center space-x-3 py-2">
                                <FiMapPin className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-900 dark:text-white">
                                  {profileData?.address?.street || 'Not provided'}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* City, State, ZIP */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                City
                              </label>
                              {isEditing ? (
                                <input
                                  {...register('city')}
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="New York"
                                />
                              ) : (
                                <div className="py-2">
                                  <span className="text-gray-900 dark:text-white">
                                    {profileData?.address?.city || 'Not provided'}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div>
                              <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                State
                              </label>
                              {isEditing ? (
                                <input
                                  {...register('state')}
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="NY"
                                />
                              ) : (
                                <div className="py-2">
                                  <span className="text-gray-900 dark:text-white">
                                    {profileData?.address?.state || 'Not provided'}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div>
                              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                ZIP Code
                              </label>
                              {isEditing ? (
                                <input
                                  {...register('zipCode')}
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="10001"
                                />
                              ) : (
                                <div className="py-2">
                                  <span className="text-gray-900 dark:text-white">
                                    {profileData?.address?.zipCode || 'Not provided'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 rounded-b-lg">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {saving ? (
                        <>
                          <LoadingSpinner size="sm" color="white" className="mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Edit Profile Button (when not editing) */}
          {!isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
              >
                <FiEdit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
