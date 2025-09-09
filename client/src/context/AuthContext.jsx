import React, { createContext, useContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";
import { authService } from "../services/authService";

// Initial state
const initialState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  REGISTER_START: "REGISTER_START",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_LOADING: "SET_LOADING",
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return { ...state, loading: true, error: null };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return { ...state, user: null, token: null, loading: false, error: null };

    case AUTH_ACTIONS.UPDATE_PROFILE:
      return { ...state, user: { ...state.user, ...action.payload }, error: null };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const authData = JSON.parse(localStorage.getItem("auth") || "{}");
          if (authData.user) {
            dispatch({
              type: AUTH_ACTIONS.LOGIN_SUCCESS,
              payload: { user: authData.user, token },
            });
          } else {
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
          }

          // Optionally sync with backend:
          // const response = await authService.getProfile();
          // dispatch({
          //   type: AUTH_ACTIONS.UPDATE_PROFILE,
          //   payload: response.data.user
          // });
        } catch (error) {
          Cookies.remove("token");
          localStorage.removeItem("auth");
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        } finally {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    initializeAuth();

    // Fallback: ensure loading is false after 5s
    const fallbackTimer = setTimeout(() => {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Login
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });
      const response = await authService.login(credentials);
      const { user, token } = response.data;

      Cookies.set("token", token, { expires: 7, secure: true, sameSite: "strict" });
      localStorage.setItem("auth", JSON.stringify({ user, token }));

      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: { user, token } });
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.REGISTER_START });
      const response = await authService.register(userData);
      const { user, token } = response.data;

      Cookies.set("token", token, { expires: 7, secure: true, sameSite: "strict" });
      localStorage.setItem("auth", JSON.stringify({ user, token }));

      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: { user, token } });
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("token");
      localStorage.removeItem("auth");
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      const updatedUser = response.data.user;

      dispatch({ type: AUTH_ACTIONS.UPDATE_PROFILE, payload: updatedUser });

      const existingData = JSON.parse(localStorage.getItem("auth") || "{}");
      localStorage.setItem("auth", JSON.stringify({ ...existingData, user: updatedUser }));

      return { success: true, user: updatedUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Profile update failed";
      return { success: false, error: errorMessage };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      await authService.changePassword(passwordData);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Password change failed";
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Role checks
  const hasRole = (role) => state.user?.role === role;
  const hasAnyRole = (roles) => roles.includes(state.user?.role);

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};

export default AuthContext;
