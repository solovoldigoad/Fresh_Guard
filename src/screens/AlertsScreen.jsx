import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../context/DataContext.jsx';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const AlertsScreen = () => {
  const { alerts, markAlertAsRead } = useData();
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'critical'

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread':
        return !alert.read;
      case 'critical':
        return alert.severity === 'danger';
      default:
        return true;
    }
  });

  const AlertCard = ({ alert }) => {
    const getSeverityColor = () => {
      switch (alert.severity) {
        case 'danger':
          return Colors.danger;
        case 'warning':
          return Colors.warning;
        default:
          return Colors.safe;
      }
    };

    const getSeverityIcon = () => {
      switch (alert.severity) {
        case 'danger':
          return 'alert-circle';
        case 'warning':
          return 'warning';
        default:
          return 'information-circle';
      }
    };

    const formatTime = (timestamp) => {
      const now = new Date();
      const alertTime = new Date(timestamp);
      const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return alertTime.toLocaleDateString();
    };

    return (
      <TouchableOpacity
        style={[
          styles.alertCard,
          !alert.read && styles.unreadAlert
        ]}
        onPress={() => markAlertAsRead(alert.id)}
      >
        <View style={styles.alertHeader}>
          <View style={[styles.severityIcon, { backgroundColor: getSeverityColor() + '20' }]}>
            <Ionicons
              name={getSeverityIcon()}
              size={24}
              color={getSeverityColor()}
            />
          </View>
          <View style={styles.alertInfo}>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            <Text style={styles.alertTime}>{formatTime(alert.timestamp)}</Text>
          </View>
          {!alert.read && <View style={styles.unreadDot} />}
        </View>
        
        <View style={styles.alertFooter}>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor() }]}>
            <Text style={styles.severityText}>{alert.severity.toUpperCase()}</Text>
          </View>
          <Text style={styles.alertType}>{alert.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const FilterButton = ({ title, value, icon }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === value && styles.filterButtonActive
      ]}
      onPress={() => setFilter(value)}
    >
      <Ionicons
        name={icon}
        size={20}
        color={filter === value ? Colors.surface : Colors.primary}
      />
      <Text style={[
        styles.filterText,
        filter === value && styles.filterTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="checkmark-circle" size={64} color={Colors.safe} />
      <Text style={styles.emptyTitle}>All Clear!</Text>
      <Text style={styles.emptyDescription}>
        {filter === 'unread' 
          ? 'No unread alerts at the moment'
          : 'No alerts matching your filter'}
      </Text>
    </View>
  );

  const AlertsSummary = () => {
    const unreadCount = alerts.filter(alert => !alert.read).length;
    const criticalCount = alerts.filter(alert => alert.severity === 'danger').length;
    
    return (
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Alert Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{alerts.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: Colors.warning }]}>{unreadCount}</Text>
            <Text style={styles.summaryLabel}>Unread</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: Colors.danger }]}>{criticalCount}</Text>
            <Text style={styles.summaryLabel}>Critical</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AlertsSummary />
      
      <View style={styles.filterContainer}>
        <FilterButton title="All" value="all" icon="list" />
        <FilterButton title="Unread" value="unread" icon="mail-unread" />
        <FilterButton title="Critical" value="critical" icon="alert-circle" />
      </View>

      {filteredAlerts.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredAlerts}
          renderItem={({ item }) => <AlertCard alert={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.alertsList}
        />
      )}

      <TouchableOpacity style={styles.markAllReadButton}>
        <Ionicons name="checkmark-done" size={20} color={Colors.surface} />
        <Text style={styles.markAllReadText}>Mark All as Read</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: Fonts.sizes.xxlarge,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  summaryLabel: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterButton: {
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
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.primary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: Colors.surface,
  },
  alertsList: {
    paddingHorizontal: Spacing.md,
  },
  alertCard: {
    backgroundColor: Colors.surface,
    marginVertical: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  severityIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  alertInfo: {
    flex: 1,
  },
  alertMessage: {
    fontSize: Fonts.sizes.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  alertTime: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  severityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },
  severityText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.small,
    fontWeight: 'bold',
  },
  alertType: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Fonts.sizes.xlarge,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  markAllReadButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  markAllReadText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.medium,
    fontWeight: 'bold',
  },
});

export default AlertsScreen;