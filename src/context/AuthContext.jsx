import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRoles } from '../constants/theme';
import { API } from '../config/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
      
      if (userData) {
        setUser(JSON.parse(userData));
        setIsFirstTime(false);
      } else if (!hasSeenWelcome) {
        setIsFirstTime(true);
      } else {
        setIsFirstTime(false);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setIsFirstTime(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (phoneNumber, password, role = UserRoles.WAREHOUSE_STAFF) => {
    try {
      const response = await API.auth.login({
        phoneNumber,
        password,
        role,
      });
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store user data and token
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', token);
        
        setUser(user);
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Network error occurred' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'token']);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await API.auth.signup({
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        password: userData.password,
        role: userData.role || UserRoles.WAREHOUSE_STAFF,
      });
      
      if (response.success) {
        return { 
          success: true, 
          message: response.message || 'Account created successfully',
          data: response.data
        };
      } else {
        return { 
          success: false, 
          error: response.message || 'Signup failed' 
        };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.message || 'Network error occurred' 
      };
    }
  };

  const switchRole = async (newRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const completeWelcome = async () => {
    try {
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
      setIsFirstTime(false);
    } catch (error) {
      console.error('Error completing welcome:', error);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    switchRole,
    completeWelcome,
    loading,
    isFirstTime,
    isAdmin: user?.role === UserRoles.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};