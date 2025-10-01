import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <LinearGradient colors={Colors.primaryGradient} style={styles.gradient}>
        <View style={styles.content}>
          {/* App Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.iconBackground}>
              <Ionicons name="leaf" size={48} color={Colors.surface} />
            </View>
          </View>
          
          {/* App Title */}
          <Text style={styles.title}>Smart Herbal{'\n'}Sprinkler</Text>
          <Text style={styles.subtitle}>Climate-Controlled Onion Storage</Text>
          
          {/* Loading Indicator */}
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.surface} />
            <Text style={styles.loadingText}>Initializing...</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    marginBottom: Spacing.xl,
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.surface,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: Fonts.sizes.large,
    color: Colors.surface + 'CC',
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  loadingText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.surface + 'AA',
    marginTop: Spacing.md,
    textAlign: 'center',
  },
});

export default SplashScreen;