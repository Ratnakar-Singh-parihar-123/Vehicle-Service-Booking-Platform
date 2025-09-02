import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiMonitor,
  FiUser,
  FiLogOut,
  FiSettings,
  FiCalendar,
  FiHome,
  FiInfo,
  FiMail,
  FiChevronDown,
  FiTruck,
  FiCreditCard,
  FiList,
  FiBell,
} from "react-icons/fi";
import NotificationCenter from "../notifications/NotificationCenter";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const profileRef = useRef(null);
  const themeRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Public Links (always visible)
  const publicLinks = [
    { to: "/", label: "Home", icon: FiHome },
    { to: "/about", label: "About", icon: FiInfo },
    { to: "/services", label: "Services", icon: FiSettings },
    { to: "/contact", label: "Contact", icon: FiMail },
  ];

  // Auth-only Links (only if logged in)
  const privateLinks = [
    { to: "/dashboard", label: "Dashboard", icon: FiCalendar },
    { to: "/book-service", label: "Book Service", icon: FiSettings },
    { to: "/my-bookings", label: "My Bookings", icon: FiList },
    { to: "/vehicles", label: "My Vehicles", icon: FiTruck },
  ];

  const authLinks = [
    { to: "/profile", label: "Profile", icon: FiUser },
    { to: "/notificationCenter", label: "Notifications", icon: FiBell },
    { to: "/payments", label: "Payments", icon: FiCreditCard },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FiTruck className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Vehicle Service
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-4">
            {publicLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                {link.label}
              </Link>
            ))}
            {user &&
              privateLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <div className="relative" ref={themeRef}>
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === "light" && <FiSun className="w-5 h-5" />}
                {theme === "dark" && <FiMoon className="w-5 h-5" />}
                {theme === "system" && <FiMonitor className="w-5 h-5" />}
              </button>
              {isThemeOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1">
                  <button
                    onClick={() => {
                      setTheme("light");
                      setIsThemeOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 text-sm ${theme === "light"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <FiSun className="w-4 h-4 mr-2" /> Light
                  </button>
                  <button
                    onClick={() => {
                      setTheme("dark");
                      setIsThemeOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 text-sm ${theme === "dark"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <FiMoon className="w-4 h-4 mr-2" /> Dark
                  </button>
                  <button
                    onClick={() => {
                      setTheme("system");
                      setIsThemeOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 text-sm ${theme === "system"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <FiMonitor className="w-4 h-4 mr-2" /> System
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            {user && <NotificationCenter />}

            {/* Profile Menu */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="hidden sm:inline">{user.name}</span>
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform ${isProfileOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1">
                    {authLinks.map((link, i) => (
                      <Link
                        key={i}
                        to={link.to}
                        className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <link.icon className="w-4 h-4 mr-2" />
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiUser className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {publicLinks.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}

            {user && (
              <div className="border-t pt-4">
                {privateLinks.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    className="flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                {authLinks.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    className="flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 mt-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiLogOut className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}