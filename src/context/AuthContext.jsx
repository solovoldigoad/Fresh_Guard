import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRoles } from '../constants/theme';

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

  const login = async (phoneNumber, otp, role = UserRoles.WAREHOUSE_STAFF) => {
    try {
      // Simulate OTP verification
      if (otp === '1234') {
        const userData = {
          id: Date.now().toString(),
          phoneNumber,
          role,
          name: role === UserRoles.ADMIN ? 'Admin User' : 'Warehouse Staff',
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid OTP' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
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
    logout,
    switchRole,
    completeWelcome,
    loading,
    isFirstTime,
    isAdmin: user?.role === UserRoles.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};