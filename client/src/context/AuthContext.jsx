// Edge Cases — Centralized Authentication Context & State Provider
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { INITIAL_USER } from '../services/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore authenticated session on initial app mount
  useEffect(() => {
    async function restoreSession() {
      try {
        const currentUser = await authApi.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null); // No saved session — user must log in or sign up
        }
      } catch (err) {
        console.error('Session restoration failed:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  // Login handler
  const login = async ({ email, password, rememberMe }) => {
    const loggedInUser = await authApi.login({ email, password, rememberMe });
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Instant demo login helper
  const demoLogin = async () => {
    setUser(INITIAL_USER);
    localStorage.setItem('edgecases_auth_user_v1', JSON.stringify(INITIAL_USER));
    return INITIAL_USER;
  };

  // Sign up handler
  const signup = async (formData) => {
    const newUser = await authApi.signup(formData);
    setUser(newUser);
    return newUser;
  };

  // Logout handler
  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  // Update user profile or preferences
  const updateUser = (updates) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('edgecases_auth_user_v1', JSON.stringify(next));
      return next;
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    demoLogin,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
