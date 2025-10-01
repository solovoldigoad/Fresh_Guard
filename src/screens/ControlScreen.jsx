import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../context/DataContext.jsx';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const ControlScreen = () => {
  const { controls, toggleControl, sensorData, herbalFluidLevel } = useData();

  const ControlCard = ({ 
    icon, 
    title, 
    description, 
    isEnabled, 
    onToggle, 
    color = Colors.primary 
  }) => (
    <View style={styles.controlCard}>
      <View style={styles.controlHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.controlInfo}>
          <Text style={styles.controlTitle}>{title}</Text>
          <Text style={styles.controlDescription}>{description}</Text>
        </View>
        <Switch
          value={isEnabled}
          onValueChange={onToggle}
          trackColor={{ false: Colors.disabled, true: color + '50' }}
          thumbColor={isEnabled ? color : Colors.surface}
        />
      </View>
      
      <View style={styles.statusRow}>
        <Text style={[styles.statusText, { color: isEnabled ? Colors.safe : Colors.textSecondary }]}>
          Status: {isEnabled ? 'ON' : 'OFF'}
        </Text>
        {isEnabled && (
          <View style={[styles.activeIndicator, { backgroundColor: color }]} />
        )}
      </View>
    </View>
  );

  const AutoModeCard = () => (
    <View style={[styles.controlCard, styles.autoModeCard]}>
      <View style={styles.controlHeader}>
        <View style={[styles.iconContainer, { backgroundColor: Colors.secondary + '20' }]}>
        <Ionicons name="construct" size={24} color={Colors.secondary} />
        </View>
        <View style={styles.controlInfo}>
          <Text style={styles.controlTitle}>Auto Mode</Text>
          <Text style={styles.controlDescription}>
            System automatically adjusts controls based on sensor readings
          </Text>
        </View>
        <Switch
          value={controls.autoMode}
          onValueChange={() => handleAutoModeToggle()}
          trackColor={{ false: Colors.disabled, true: Colors.secondary + '50' }}
          thumbColor={controls.autoMode ? Colors.secondary : Colors.surface}
        />
      </View>
      
      {controls.autoMode && (
        <View style={styles.autoModeInfo}>
          <Text style={styles.autoModeText}>
            🤖 AI is monitoring and will adjust systems automatically
          </Text>
        </View>
      )}
    </View>
  );

  const handleAutoModeToggle = () => {
    if (controls.autoMode) {
      Alert.alert(
        'Disable Auto Mode?',
        'You will need to manually control the systems.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Disable', onPress: () => toggleControl('autoMode') },
        ]
      );
    } else {
      toggleControl('autoMode');
    }
  };

  const SystemStatus = () => (
    <View style={styles.statusCard}>
      <Text style={styles.statusTitle}>Current Conditions</Text>
      <View style={styles.statusGrid}>
        <View style={styles.statusItem}>
          <Ionicons name="thermometer" size={20} color={Colors.primary} />
          <Text style={styles.statusLabel}>Temperature</Text>
          <Text style={styles.statusValue}>{sensorData.temperature.toFixed(1)}°C</Text>
        </View>
        <View style={styles.statusItem}>
          <Ionicons name="water" size={20} color={Colors.primary} />
          <Text style={styles.statusLabel}>Humidity</Text>
          <Text style={styles.statusValue}>{sensorData.humidity.toFixed(0)}%</Text>
        </View>
      </View>
    </View>
  );

  const HerbalFluidStatus = () => (
    <View style={styles.fluidCard}>
      <View style={styles.fluidHeader}>
        <Ionicons name="beaker" size={24} color={Colors.primary} />
        <Text style={styles.fluidTitle}>Herbal Fluid Level</Text>
      </View>
      
      <View style={styles.fluidMeter}>
        <View style={styles.fluidBackground}>
          <View 
            style={[
              styles.fluidLevel, 
              { 
                width: `${herbalFluidLevel}%`,
                backgroundColor: herbalFluidLevel > 30 ? Colors.safe : 
                               herbalFluidLevel > 15 ? Colors.warning : Colors.danger
              }
            ]} 
          />
        </View>
        <Text style={styles.fluidPercentage}>{herbalFluidLevel}%</Text>
      </View>
      
      {herbalFluidLevel < 30 && (
        <TouchableOpacity style={styles.refillButton}>
          <Ionicons name="add-circle" size={20} color={Colors.surface} />
          <Text style={styles.refillText}>Schedule Refill</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AutoModeCard />
      
      <SystemStatus />
      
      <Text style={styles.sectionTitle}>Manual Controls</Text>
      
      <ControlCard
        icon="rainy"
        title="Ventilation Fans"
        description="Control air circulation in storage area"
        isEnabled={controls.fans}
        onToggle={() => toggleControl('fans')}
        color={Colors.primary}
      />
      
      <ControlCard
        icon="contract"
        title="Air Vents"
        description="Regulate fresh air intake"
        isEnabled={controls.vents}
        onToggle={() => toggleControl('vents')}
        color="#1976D2"
      />
      
      <ControlCard
        icon="water-outline"
        title="Herbal Sprinkler"
        description="Dispense herbal mist for preservation"
        isEnabled={controls.herbalSprinkler}
        onToggle={() => toggleControl('herbalSprinkler')}
        color={Colors.safe}
      />
      
      <HerbalFluidStatus />
      
      <View style={styles.safetyNotice}>
        <Ionicons name="shield-checkmark" size={20} color={Colors.warning} />
        <Text style={styles.safetyText}>
          Always monitor conditions when using manual controls. 
          Enable Auto Mode for optimal preservation.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: Spacing.lg,
  },
  controlCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.large,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  autoModeCard: {
    borderWidth: 2,
    borderColor: Colors.secondary + '30',
    marginTop: Spacing.lg,
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  controlInfo: {
    flex: 1,
  },
  controlTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  controlDescription: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textSecondary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statusText: {
    fontSize: Fonts.sizes.medium,
    fontWeight: '600',
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  autoModeInfo: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.secondary + '10',
    borderRadius: BorderRadius.medium,
  },
  autoModeText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.text,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  statusTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusLabel: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statusValue: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  fluidCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  fluidHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  fluidTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  fluidMeter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  fluidBackground: {
    flex: 1,
    height: 20,
    backgroundColor: Colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  fluidLevel: {
    height: '100%',
    borderRadius: 10,
  },
  fluidPercentage: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    minWidth: 40,
  },
  refillButton: {
    backgroundColor: Colors.warning,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  refillText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.medium,
    fontWeight: 'bold',
  },
  safetyNotice: {
    flexDirection: 'row',
    backgroundColor: Colors.warning + '20',
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    marginVertical: Spacing.lg,
    alignItems: 'flex-start',
  },
  safetyText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Fonts.sizes.medium,
    color: Colors.text,
    lineHeight: 20,
  },
});

export default ControlScreen;