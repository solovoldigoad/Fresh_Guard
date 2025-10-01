import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../context/DataContext.jsx';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const { width } = Dimensions.get('window');

const InventoryScreen = () => {
  const { racks, herbalFluidLevel, sensorData } = useData();

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return Colors.safe;
      case 'warning':
        return Colors.warning;
      case 'spoiled':
        return Colors.danger;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'spoiled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const RackCard = ({ rack }) => {
    const statusColor = getStatusColor(rack.status);
    
    return (
      <TouchableOpacity style={styles.rackCard}>
        <View style={styles.rackHeader}>
          <View style={[styles.rackIcon, { backgroundColor: statusColor + '20' }]}>
            <Ionicons
              name={getStatusIcon(rack.status)}
              size={32}
              color={statusColor}
            />
          </View>
          <View style={styles.rackInfo}>
            <Text style={styles.rackName}>{rack.name}</Text>
            <Text style={[styles.rackStatus, { color: statusColor }]}>
              {rack.status.charAt(0).toUpperCase() + rack.status.slice(1)}
            </Text>
          </View>
          <View style={styles.rackWeight}>
            <Text style={styles.weightNumber}>{rack.weight}</Text>
            <Text style={styles.weightUnit}>kg</Text>
          </View>
        </View>
        
        <View style={styles.rackDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="scale-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>Weight: {rack.weight} kg</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>
              Updated: {new Date(rack.lastUpdated).toLocaleTimeString()}
            </Text>
          </View>
        </View>

        {rack.status === 'spoiled' && (
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.removeButton]}>
              <Ionicons name="trash" size={16} color={Colors.surface} />
              <Text style={styles.actionButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}

        {rack.status === 'warning' && (
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.inspectButton]}>
              <Ionicons name="eye" size={16} color={Colors.surface} />
              <Text style={styles.actionButtonText}>Inspect</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const OverviewStats = () => {
    const totalWeight = racks.reduce((sum, rack) => sum + rack.weight, 0);
    const healthyRacks = racks.filter(rack => rack.status === 'healthy').length;
    const spoiledRacks = racks.filter(rack => rack.status === 'spoiled').length;
    
    return (
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Warehouse Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalWeight}</Text>
            <Text style={styles.statLabel}>Total Weight (kg)</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.safe }]}>{healthyRacks}</Text>
            <Text style={styles.statLabel}>Healthy Racks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.danger }]}>{spoiledRacks}</Text>
            <Text style={styles.statLabel}>Issues</Text>
          </View>
        </View>
      </View>
    );
  };

  const FluidStatus = () => (
    <View style={styles.fluidCard}>
      <View style={styles.fluidHeader}>
        <Ionicons name="beaker" size={24} color={Colors.primary} />
        <Text style={styles.fluidTitle}>Herbal Fluid Status</Text>
        <View style={[
          styles.fluidStatusBadge,
          { backgroundColor: herbalFluidLevel > 30 ? Colors.safe : Colors.warning }
        ]}>
          <Text style={styles.fluidStatusText}>
            {herbalFluidLevel > 30 ? 'OK' : 'LOW'}
          </Text>
        </View>
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
      
      <Text style={styles.fluidDescription}>
        Herbal preservation fluid helps maintain freshness and prevents spoilage
      </Text>
    </View>
  );

  const EnvironmentCard = () => (
    <View style={styles.environmentCard}>
      <Text style={styles.environmentTitle}>Current Environment</Text>
      <View style={styles.environmentGrid}>
        <View style={styles.envItem}>
          <Ionicons name="thermometer" size={20} color={Colors.primary} />
          <Text style={styles.envValue}>{sensorData.temperature.toFixed(1)}°C</Text>
          <Text style={styles.envLabel}>Temperature</Text>
        </View>
        <View style={styles.envItem}>
          <Ionicons name="water" size={20} color={Colors.primary} />
          <Text style={styles.envValue}>{sensorData.humidity.toFixed(0)}%</Text>
          <Text style={styles.envLabel}>Humidity</Text>
        </View>
        <View style={styles.envItem}>
          <Ionicons name="leaf" size={20} color={Colors.primary} />
          <Text style={styles.envValue}>{sensorData.ethylene.toFixed(2)}</Text>
          <Text style={styles.envLabel}>Ethylene (ppm)</Text>
        </View>
      </View>
    </View>
  );

  const RackVisualization = () => (
    <View style={styles.visualizationCard}>
      <Text style={styles.visualizationTitle}>Warehouse Layout</Text>
      <View style={styles.warehouseLayout}>
        {racks.map((rack, index) => (
          <View
            key={rack.id}
            style={[
              styles.rackVisual,
              { backgroundColor: getStatusColor(rack.status) + '30' },
              { borderColor: getStatusColor(rack.status) }
            ]}
          >
            <Text style={[styles.rackVisualText, { color: getStatusColor(rack.status) }]}>
              {rack.id}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.safe }]} />
          <Text style={styles.legendText}>Healthy</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.warning }]} />
          <Text style={styles.legendText}>Warning</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.danger }]} />
          <Text style={styles.legendText}>Spoiled</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <OverviewStats />
      <EnvironmentCard />
      <RackVisualization />
      <FluidStatus />
      
      <Text style={styles.sectionTitle}>Storage Racks</Text>
      
      {racks.map((rack) => (
        <RackCard key={rack.id} rack={rack} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  statsCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  statsTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Fonts.sizes.xxlarge,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  environmentCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    marginTop: 0,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  environmentTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  environmentGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  envItem: {
    alignItems: 'center',
  },
  envValue: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  envLabel: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  visualizationCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    marginTop: 0,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  visualizationTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  warehouseLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  rackVisual: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.medium,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Spacing.sm,
  },
  rackVisualText: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  rackCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  rackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  rackIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  rackInfo: {
    flex: 1,
  },
  rackName: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  rackStatus: {
    fontSize: Fonts.sizes.medium,
    fontWeight: '600',
  },
  rackWeight: {
    alignItems: 'center',
  },
  weightNumber: {
    fontSize: Fonts.sizes.xxlarge,
    fontWeight: 'bold',
    color: Colors.text,
  },
  weightUnit: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  rackDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  removeButton: {
    backgroundColor: Colors.danger,
  },
  inspectButton: {
    backgroundColor: Colors.warning,
  },
  actionButtonText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.medium,
    fontWeight: 'bold',
  },
  fluidCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    marginTop: 0,
    padding: Spacing.lg,
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
    flex: 1,
  },
  fluidStatusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },
  fluidStatusText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.small,
    fontWeight: 'bold',
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
  fluidDescription: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

export default InventoryScreen;