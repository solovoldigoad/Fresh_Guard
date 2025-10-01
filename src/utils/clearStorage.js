import AsyncStorage from '@react-native-async-storage/async-storage';

// Utility function to clear all AsyncStorage data for testing
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    return false;
  }
};

// Clear only auth-related data
export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('hasSeenWelcome');
    console.log('Auth data cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing auth data:', error);
    return false;
  }
};

// Set as first time user (useful for testing welcome screen)
export const resetToFirstTime = async () => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('hasSeenWelcome');
    console.log('Reset to first time user successfully');
    return true;
  } catch (error) {
    console.error('Error resetting to first time:', error);
    return false;
  }
};