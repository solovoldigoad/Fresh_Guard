import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { resetToFirstTime } from '../utils/clearStorage.js';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

// Development component to reset app state for testing welcome screen
// Remove this component in production build
const DevResetButton = ({ onReset }) => {
  const handleReset = async () => {
    Alert.alert(
      'Reset App State',
      'This will reset the app to first-time user state. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await resetToFirstTime();
              if (onReset) onReset();
              Alert.alert('Success', 'App state reset. Please reload the app.');
            } catch (error) {
              Alert.alert('Error', 'Failed to reset app state.');
            }
          },
        },
      ]
    );
  };

  // Only show in development mode
  if (__DEV__) {
    return (
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>🔄 Reset App (Dev)</Text>
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  resetButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    elevation: 5,
  },
  resetButtonText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.small,
    fontWeight: 'bold',
  },
});

export default DevResetButton;