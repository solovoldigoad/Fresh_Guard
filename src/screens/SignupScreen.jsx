import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  Keyboard,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';
import { Colors, Fonts, Spacing, BorderRadius, UserRoles } from '../constants/theme';

const { width: screenWidth } = Dimensions.get('window');

// Wave Form Container Component with curved top
const WaveFormContainer = ({ children, style }) => {
  return (
    <View style={[style, { position: 'relative', backgroundColor: 'transparent' }]}>
      {/* Wave SVG Path - your custom design */}
      <Svg
        height="120"
        width={screenWidth}
        style={styles.wavePath}
        viewBox={`0 0 ${screenWidth} 120`}
        preserveAspectRatio="none"
      >
        {/* Your curved wave path - no straight lines */}
        <Path
          d={`
            M0,60 
            Q${screenWidth / 4},0 ${screenWidth / 2},60 
            T${screenWidth},60 
            L${screenWidth},120 
            L0,120 Z
          `}
          fill={Colors.surface}
        />
      </Svg>
      {/* Form Content */}
      <View style={styles.waveFormContent}>
        {children}
      </View>
    </View>
  );
};

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setaddress] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(UserRoles.WAREHOUSE_STAFF);
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  // Animated values for smooth transitions
  const containerTranslateY = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(new Animated.Value(1)).current;
  
  const { signup } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        const duration = Platform.OS === 'ios' ? e.duration || 250 : 250;
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
        
        // Calculate how much to move the container up (60% of keyboard height)
        const translateValue = -(e.endCoordinates.height * 0.6);
        
        Animated.parallel([
          Animated.timing(containerTranslateY, {
            toValue: translateValue,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(headerHeight, {
            toValue: 0.6, // Compress header to 60% of original size
            duration: duration,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      (e) => {
        const duration = Platform.OS === 'ios' ? e.duration || 250 : 250;
        setKeyboardVisible(false);
        setKeyboardHeight(0);
        
        Animated.parallel([
          Animated.timing(containerTranslateY, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(headerHeight, {
            toValue: 1, // Restore header to original size
            duration: duration,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, [containerTranslateY, headerHeight]);

  const handleSignup = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', t('enterFullName') || 'Please enter your full name');
      return;
    }
    
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', t('enterValidPhone') || 'Please enter a valid 10-digit phone number');
      return;
    }

    if (!address.trim()) {
      Alert.alert('Error', t('enterValidaddress') || 'Please enter your address');
      return;
    }

    if (!password.trim() || password.length < 6) {
      Alert.alert('Error', t('enterValidPassword') || 'Please enter a password with at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      const userData = {
        fullName,
        phoneNumber,
        address,
        password,
        role: selectedRole,
      };
      
      const result = await signup(userData);
      
      if (result.success) {
        Alert.alert(
          t('signupSuccessful') || 'Signup Successful!', 
          result.message || t('accountCreated') || 'Your account has been created successfully. You can now login.',
          [
            {
              text: t('goToLogin') || 'Go to Login',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      } else {
        Alert.alert('Error', result.error || 'Failed to create account');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
    
    setLoading(false);
  };

  const RoleSelector = () => (
    <View style={styles.roleSelector}>
      <Text style={styles.roleLabel}>{t('selectRole')}</Text>
      <View style={styles.roleButtons}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === UserRoles.WAREHOUSE_STAFF && styles.roleButtonSelected
          ]}
          onPress={() => setSelectedRole(UserRoles.WAREHOUSE_STAFF)}
        >
          <Ionicons 
            name="person" 
            size={20} 
            color={selectedRole === UserRoles.WAREHOUSE_STAFF ? Colors.surface : Colors.primary} 
          />
          <Text style={[
            styles.roleButtonText,
            selectedRole === UserRoles.WAREHOUSE_STAFF && styles.roleButtonTextSelected
          ]}>
            {t('warehouseStaff')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === UserRoles.ADMIN && styles.roleButtonSelected
          ]}
          onPress={() => setSelectedRole(UserRoles.ADMIN)}
        >
          <Ionicons 
            name="shield-checkmark" 
            size={20} 
            color={selectedRole === UserRoles.ADMIN ? Colors.surface : Colors.primary} 
          />
          <Text style={[
            styles.roleButtonText,
            selectedRole === UserRoles.ADMIN && styles.roleButtonTextSelected
          ]}>
            {t('admin')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={Colors.primaryGradient} style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[
          styles.header,
          {
            transform: [{ scaleY: headerHeight }],
            opacity: headerHeight,
          }
        ]}>
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={60} color={Colors.surface} />
          </View>
          <Text style={styles.title}>{t('createAccount') || 'Create Account'}</Text>
          <Text style={styles.subtitle}>{t('joinWarehouseTeam') || 'Join Our Warehouse Team'}</Text>
        </Animated.View>

        <Animated.View style={{
          transform: [{ translateY: containerTranslateY }],
        }}>
          <WaveFormContainer style={styles.formContainer}>
            <RoleSelector />

            {/* Full Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('fullName') || 'Full Name'}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder={t('enterFullName') || 'Enter your full name'}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('phoneNumber')}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call" size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder={t('enterPhoneNumber')}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* address Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('address') || 'Address'}</Text>
              <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder={t('enterAddress') || 'Enter your address'}
                  value={address}
                  onChangeText={setaddress}
                  keyboardType="Address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('password') || 'Password'}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder={t('enterPassword') || 'Enter your password (min 6 characters)'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading 
                  ? (t('loading') || 'Loading...') 
                  : (t('createAccount') || 'Create Account')
                }
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>
                {t('alreadyHaveAccount') || 'Already have an account? '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>{t('login')}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Footer inside form container */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {t('secureSystem')}
              </Text>
            </View>
          </WaveFormContainer>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 180,
    transformOrigin: 'top',
  },
  headerTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: Spacing.md,
  },
  languageSelector: {
    backgroundColor: Colors.surface + '20',
  },
  logoContainer: {
    backgroundColor: Colors.surface + '20',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xlarge,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Fonts.sizes.xxlarge,
    fontWeight: 'bold',
    color: Colors.surface,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Fonts.sizes.large,
    color: Colors.surface + 'CC',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    minHeight: 500,
  },
  wavePath: {
    position: 'relative',
    zIndex: 1,
  },
  waveFormContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    zIndex: 2,
    backgroundColor: Colors.surface,
    minHeight: 450,
  },
  roleSelector: {
    marginBottom: Spacing.lg,
  },
  roleLabel: {
    fontSize: Fonts.sizes.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  roleButtonSelected: {
    backgroundColor: Colors.primary,
  },
  roleButtonText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.primary,
    fontWeight: '500',
  },
  roleButtonTextSelected: {
    color: Colors.surface,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: Fonts.sizes.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Fonts.sizes.medium,
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonDisabled: {
    backgroundColor: Colors.disabled,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
  },
  resendButton: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  resendText: {
    color: Colors.primary,
    fontSize: Fonts.sizes.medium,
    fontWeight: '500',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  loginLinkText: {
    color: Colors.textSecondary,
    fontSize: Fonts.sizes.medium,
  },
  loginLink: {
    color: Colors.primary,
    fontSize: Fonts.sizes.medium,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: Fonts.sizes.small,
    textAlign: 'center',
  },
});

export default SignupScreen;