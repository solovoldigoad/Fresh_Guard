import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { t, currentLanguage } = useLanguage();

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={24} color={Colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent || (
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <View style={styles.profileAvatar}>
            <Ionicons 
              name={user?.role === 'admin' ? 'shield-checkmark' : 'person'} 
              size={32} 
              color={Colors.primary} 
            />
          </View>
          <View>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileRole}>
              {user?.role === 'admin' ? t('admin') : t('warehouseStaff')}
            </Text>
            <Text style={styles.profilePhone}>{user?.phoneNumber}</Text>
          </View>
        </View>
      </View>

      {/* Language & Localization */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language & Region</Text>
        
        <SettingItem
          icon="language"
          title="App Language"
          subtitle={currentLanguage === 'en' ? 'English' : 'हिंदी (Hindi)'}
          rightComponent={
            <LanguageSelector 
              compact={false} 
              showLabel={false}
              style={styles.languageSelectorInline}
            />
          }
        />
      </View>

      {/* App Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <SettingItem
          icon="notifications"
          title="Notifications"
          subtitle="Manage alert preferences"
          onPress={() => {}}
        />
        
        <SettingItem
          icon="moon"
          title="Dark Mode"
          subtitle="Switch to dark theme"
          onPress={() => {}}
        />
        
        <SettingItem
          icon="refresh"
          title="Data Refresh Rate"
          subtitle="Every 5 seconds"
          onPress={() => {}}
        />
      </View>

      {/* System & Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System & Support</Text>
        
        <SettingItem
          icon="help-circle"
          title="Help & Support"
          subtitle="Get help and contact support"
          onPress={() => {}}
        />
        
        <SettingItem
          icon="document-text"
          title="Terms of Service"
          subtitle="View terms and conditions"
          onPress={() => {}}
        />
        
        <SettingItem
          icon="shield-checkmark"
          title="Privacy Policy"
          subtitle="View privacy policy"
          onPress={() => {}}
        />
        
        <SettingItem
          icon="information-circle"
          title="App Version"
          subtitle="v1.0.0"
          onPress={() => {}}
        />
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out" size={20} color={Colors.surface} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileSection: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  profileName: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  profileRole: {
    fontSize: Fonts.sizes.medium,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  profilePhone: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    marginTop: 0,
    borderRadius: BorderRadius.large,
    elevation: 2,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: Fonts.sizes.medium,
    fontWeight: 'bold',
    color: Colors.text,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Fonts.sizes.medium,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  settingSubtitle: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  languageSelectorInline: {
    borderColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  logoutButton: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  logoutText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.medium,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;