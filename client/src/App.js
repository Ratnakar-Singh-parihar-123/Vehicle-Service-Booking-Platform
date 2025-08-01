import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layout components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookService from './pages/BookService';
import MyBookings from './pages/MyBookings';
import BookingDetails from './pages/BookingDetails';
import BookingDetailsDemo from './pages/BookingDetailsDemo';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AboutMeDemo from './pages/AboutMeDemo';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Auth components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';

// Loading component
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  // Apply theme class to document
  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Helmet>
        <title>Vehicle Service Booking Platform</title>
        <meta name="description" content="Book vehicle services easily with our comprehensive platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/dashboard" replace /> : <Register />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/book-service" 
              element={
                <ProtectedRoute>
                  <BookService />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <ProtectedRoute>
                  <BookingDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-demo"
              element={<BookingDetailsDemo />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/about-me-demo" element={<AboutMeDemo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Service Center routes */}
            <Route 
              path="/service-center/*" 
              element={
                <ProtectedRoute allowedRoles={['service_center', 'admin']}>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="bookings" element={<MyBookings />} />
                    <Route path="profile" element={<Profile />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />

            {/* Admin routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<div>User Management</div>} />
                    <Route path="service-centers" element={<div>Service Center Management</div>} />
                    <Route path="services" element={<div>Service Management</div>} />
                    <Route path="bookings" element={<MyBookings />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
