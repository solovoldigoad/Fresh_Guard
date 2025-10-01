import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,

  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { useAuth } from '../context/AuthContext.jsx';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const { width: screenWidth } = Dimensions.get('window');

// Simple Downward Curve Component
const CurvedContainer = ({ children, colors = [Colors.primary, Colors.primary], style }) => {
  return (
    <View style={[style, { position: 'relative' }]}>
      {/* SVG Curved Path */}
      <Svg
        height="60"
        width={screenWidth}
        style={styles.curvePath}
        viewBox={`0 0 ${screenWidth} 60`}
        preserveAspectRatio="none"
      >
        <Defs>
          <SvgLinearGradient id="curve-gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors[0]} stopOpacity="1" />
            <Stop offset="1" stopColor={colors[1]} stopOpacity="1" />
          </SvgLinearGradient>
        </Defs>
        {/* More pronounced curve that bends downward on both sides */}
        <Path
          d={`M0,10 Q${screenWidth/2},100 ${screenWidth},10 L${screenWidth},60 L0,60 Z`}
          fill="url(#curve-gradient)"
        />
      </Svg>
      
      {/* Content Background */}
      <LinearGradient
        colors={colors}
        style={styles.curvedContent}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const WelcomeScreen = ({ navigation }) => {
  const { completeWelcome } = useAuth();

  const handleGetStarted = async () => {
    try {
      // Mark welcome as seen
      await completeWelcome();
      // Navigate to login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('WelcomeScreen: Error completing welcome:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container }>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Image with Overlay */}
      <View style={styles.backgroundContainer}>
        {/* Greenhouse/Farm Image Background */}
        <View style={styles.imageContainer}>
        <Image 
        source={require("../../assets/onionHome.webp")}   // put your image in assets folder
        style={styles.Topimage}
      />
        </View>
        
        {/* App Icon/Logo - positioned above curved container */}
        <View style={styles.logoContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="leaf" size={32} color={Colors.surface} />
          </View>
        </View>
        
        {/* Bottom Content with Curved Path */}
        <CurvedContainer
          colors={[Colors.primary, Colors.primary]}
          style={styles.contentContainer}
        >
          {/* Main Title */}
          <Text style={styles.title}>Manage Your{'\n'}Smart Warehouse</Text>
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            The smart preservation system is designed to help make companies great at storing and keeping your onions fresh.
          </Text>
          
          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Ionicons name="thermometer" size={20} color={Colors.surface} />
              <Text style={styles.featureText}>Climate Control</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="water" size={20} color={Colors.surface} />
              <Text style={styles.featureText}>Herbal Sprinkler</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="analytics" size={20} color={Colors.surface} />
              <Text style={styles.featureText}>Real-time Monitoring</Text>
            </View>
          </View>
          
          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </CurvedContainer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backgroundContainer: {
    flex: 1,
    position: 'relative', // Enable absolute positioning for logo
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Topimage: {
    height: 450,
    resizeMode: "cover", 
  },

  contentContainer: {
    zIndex: 1,
    marginTop: -60, 
  },
  logoContainer: {
    position: 'absolute',
    top: '50%', // Position at middle of screen
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10, // High z-index to appear above everything
    marginTop: -10, // Adjust to center the logo above curved container
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {

    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.surface,
    textAlign: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: Fonts.sizes.medium,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: Fonts.sizes.small,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  getStartedButton: {
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xlarge,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: Spacing.md, // Add horizontal margin for better fitting
 // Add bottom margin
  },
  buttonText: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default WelcomeScreen;