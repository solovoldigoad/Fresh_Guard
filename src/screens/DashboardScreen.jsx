import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import MonitoringCard from '../components/MonitoringCard.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { 
    sensorData, 
    getSensorStatus, 
    alerts, 
    isOnline, 
    setIsOnline 
  } = useData();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate network refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const unreadAlertsCount = alerts.filter(alert => !alert.read).length;

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{t('welcomeBack')}</Text>
        <Text style={styles.userName}>{user?.name}</Text>
      </View>
      <View style={styles.headerActions}>
        <LanguageSelector 
          compact={true} 
          style={styles.languageSelector}
        />
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('Alerts')}
        >
          <Ionicons name="notifications" size={24} color="#000000" />
          {unreadAlertsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadAlertsCount > 9 ? '9+' : unreadAlertsCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={logout}
        >
          <Ionicons name="log-out" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ConnectionStatus = () => (
    <View style={[
      styles.connectionStatus, 
      { backgroundColor: isOnline ? Colors.safe : Colors.accent }
    ]}>
      <Ionicons 
        name={isOnline ? 'wifi' : 'wifi-off'} 
        size={16} 
        color={Colors.surface} 
      />
      <Text style={styles.connectionText}>
        {isOnline ? 'Connected' : 'SMS Alert Active - Offline Mode'}
      </Text>
      {!isOnline && (
        <TouchableOpacity 
          onPress={() => setIsOnline(true)}
          style={styles.reconnectButton}
        >
          <Text style={styles.reconnectText}>Reconnect</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const SystemOverview = () => {
    const overallStatus = () => {
      const statuses = [
        getSensorStatus('temperature', sensorData.temperature),
        getSensorStatus('humidity', sensorData.humidity),
        getSensorStatus('ethylene', sensorData.ethylene),
        getSensorStatus('weight', sensorData.weight),
      ];
      
      if (statuses.includes('danger')) return 'danger';
      if (statuses.includes('warning')) return 'warning';
      return 'safe';
    };

    const status = overallStatus();
    const getStatusMessage = () => {
      switch (status) {
        case 'safe':
          return 'All systems operating normally';
        case 'warning':
          return 'Some parameters need attention';
        case 'danger':
          return 'Critical issues detected!';
        default:
          return 'System status unknown';
      }
    };

    return (
      <View style={[styles.overviewCard, {
        backgroundColor: status === 'safe' ? Colors.safe : 
                        status === 'warning' ? Colors.warning : Colors.danger
      }]}>
        <View style={styles.overviewHeader}>
          <Ionicons 
            name={status === 'safe' ? 'checkmark-circle' : 
                  status === 'warning' ? 'warning' : 'alert-circle'} 
            size={24} 
            color={Colors.surface} 
          />
          <Text style={styles.overviewTitle}>System Status</Text>
        </View>
        <Text style={styles.overviewMessage}>{getStatusMessage()}</Text>
        <Text style={styles.lastUpdate}>
          Last updated: {new Date().toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <ConnectionStatus />
        <SystemOverview />
        
        <Text style={styles.sectionTitle}>Live Monitoring</Text>
        
        <View style={styles.monitoringGrid}>
          <View style={styles.gridRow}>
            <MonitoringCard
              icon="thermometer"
              title="Temperature"
              value={sensorData.temperature.toFixed(2)}
              unit="°C"
              status={getSensorStatus('temperature', sensorData.temperature)}
            />
            <MonitoringCard
              icon="water"
              title="Humidity"
              value={sensorData.humidity.toFixed(3)}
              unit="%"
              status={getSensorStatus('humidity', sensorData.humidity)}
            />
          </View>
          
          <View style={styles.gridRow}>
            <MonitoringCard
              icon="leaf"
              title="Ethylene Gas"
              value={sensorData.ethylene.toFixed(2)}
              unit="ppm"
              status={getSensorStatus('ethylene', sensorData.ethylene)}
            />
            <MonitoringCard
              icon="scale"
              title="Weight"
              value={sensorData.weight.toFixed(1)}
              unit="kg"
              status={getSensorStatus('weight', sensorData.weight)}
            />
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Inventory')}
            >
              <Ionicons name="grid" size={24} color={Colors.primary} />
              <Text style={styles.actionText}>Racks</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="settings" size={24} color={Colors.primary} />
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.surface, // White background
    padding: Spacing.lg,
    paddingTop: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: Colors.text, // Black text
    fontSize: Fonts.sizes.medium,
  },
  userName: {
    color: Colors.text, // Black text
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  languageSelector: {
    backgroundColor: '#F0F0F0', // Light gray background for visibility on white header
  },
  headerButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    margin: Spacing.md,
    marginBottom: 0,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  connectionText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.medium,
    fontWeight: '500',
    flex: 1,
  },
  reconnectButton: {
    backgroundColor: Colors.surface + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
  },
  reconnectText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.small,
    fontWeight: 'bold',
  },
  overviewCard: {
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  overviewTitle: {
    color: Colors.surface,
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
  },
  overviewMessage: {
    color: Colors.surface,
    fontSize: Fonts.sizes.medium,
    marginBottom: Spacing.xs,
  },
  lastUpdate: {
    color: Colors.surface + 'AA',
    fontSize: Fonts.sizes.small,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  monitoringGrid: {
    paddingHorizontal: Spacing.md,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActions: {
    marginBottom: Spacing.xl,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Changed from space-around for better distribution
    marginHorizontal: Spacing.md, // Reduced margin for more width
    gap: Spacing.sm, // Add gap between buttons
  },
  actionButton: {
    flex: 1, // Make buttons flex to take equal width
    alignItems: 'center',
    backgroundColor: '#f4f3ef', // Light beige background
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 2,
    marginHorizontal: Spacing.xs, // Small margin between buttons
  },
  actionText: {
    color: Colors.primary,
    fontSize: Fonts.sizes.medium,
    fontWeight: '500',
    marginTop: Spacing.sm,
  },
});

export default DashboardScreen;