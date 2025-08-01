import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  theme: 'system', // 'light', 'dark', or 'system'
  isDark: false
};

// Action types
const THEME_ACTIONS = {
  SET_THEME: 'SET_THEME',
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_SYSTEM_THEME: 'SET_SYSTEM_THEME'
};

// Reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload,
        isDark: action.payload === 'dark' || 
                (action.payload === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      };

    case THEME_ACTIONS.TOGGLE_THEME:
      const newTheme = state.isDark ? 'light' : 'dark';
      return {
        ...state,
        theme: newTheme,
        isDark: newTheme === 'dark'
      };

    case THEME_ACTIONS.SET_SYSTEM_THEME:
      return {
        ...state,
        isDark: state.theme === 'system' ? action.payload : state.isDark
      };

    default:
      return state;
  }
};

// Create context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      dispatch({
        type: THEME_ACTIONS.SET_THEME,
        payload: savedTheme
      });
    } else {
      dispatch({
        type: THEME_ACTIONS.SET_THEME,
        payload: 'system'
      });
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      dispatch({
        type: THEME_ACTIONS.SET_SYSTEM_THEME,
        payload: e.matches
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  // Set theme function
  const setTheme = (theme) => {
    dispatch({
      type: THEME_ACTIONS.SET_THEME,
      payload: theme
    });
  };

  // Toggle theme function
  const toggleTheme = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_THEME });
  };

  // Get theme options
  const getThemeOptions = () => [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' }
  ];

  // Get current theme display info
  const getCurrentThemeInfo = () => {
    const options = getThemeOptions();
    return options.find(option => option.value === state.theme);
  };

  const value = {
    ...state,
    setTheme,
    toggleTheme,
    getThemeOptions,
    getCurrentThemeInfo
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
