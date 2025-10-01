import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const MonitoringCard = ({ 
  icon, 
  title, 
  value, 
  unit, 
  status, 
  gradient 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'safe':
        return Colors.safe;
      case 'warning':
        return Colors.warning;
      case 'danger':
        return Colors.danger;
      default:
        return Colors.safe;
    }
  };

  const getStatusGradient = () => {
    switch (status) {
      case 'safe':
        return Colors.primaryGradient;
      case 'warning':
        return Colors.warningGradient;
      case 'danger':
        return Colors.dangerGradient;
      default:
        return Colors.primaryGradient;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'safe':
        return 'Safe';
      case 'warning':
        return 'Warning';
      case 'danger':
        return 'Alert';
      default:
        return 'Safe';
    }
  };

  return (
    <LinearGradient 
      colors={gradient || getStatusGradient()} 
      style={styles.card}
    >
      <View style={styles.header}>
        <Ionicons 
          name={icon} 
          size={24} 
          color={Colors.surface} 
        />
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    margin: Spacing.sm,
    minHeight: 130,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
    backgroundColor: Colors.surface + '20',
  },
  statusText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.small,
    fontWeight: 'bold',
  },
  title: {
    color: Colors.surface,
    fontSize: Fonts.sizes.medium,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.sm,
  },
  value: {
    color: Colors.surface,
    fontSize: Fonts.sizes.xxlarge,
    fontWeight: 'bold',
  },
  unit: {
    color: Colors.surface + 'CC',
    fontSize: Fonts.sizes.large,
    marginLeft: Spacing.xs,
  },
});

export default MonitoringCard;