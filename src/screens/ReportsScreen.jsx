import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useData } from '../context/DataContext.jsx';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const { width } = Dimensions.get('window');

const ReportsScreen = () => {
  const { getHistoricalData } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [selectedChart, setSelectedChart] = useState('temperature');

  const historicalData = getHistoricalData();

  const chartConfig = {
    backgroundColor: Colors.surface,
    backgroundGradientFrom: Colors.surface,
    backgroundGradientTo: Colors.surface,
    decimalPlaces: 1,
    color: (opacity = 1) => Colors.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
    labelColor: (opacity = 1) => Colors.text + Math.round(opacity * 255).toString(16).padStart(2, '0'),
    style: {
      borderRadius: BorderRadius.medium,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: Colors.primary,
    },
    propsForLabels: {
      fontSize: 10,
    },
  };

  const getChartData = () => {
    const labels = historicalData.map(item => `${item.time}h`);
    
    switch (selectedChart) {
      case 'temperature':
        return {
          labels,
          datasets: [
            {
              data: historicalData.map(item => item.temperature),
              color: (opacity = 1) => Colors.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
              strokeWidth: 3,
            },
          ],
        };
      case 'humidity':
        return {
          labels,
          datasets: [
            {
              data: historicalData.map(item => item.humidity),
              color: (opacity = 1) => Colors.safe + Math.round(opacity * 255).toString(16).padStart(2, '0'),
              strokeWidth: 3,
            },
          ],
        };
      case 'ethylene':
        return {
          labels,
          datasets: [
            {
              data: historicalData.map(item => item.ethylene),
              color: (opacity = 1) => Colors.warning + Math.round(opacity * 255).toString(16).padStart(2, '0'),
              strokeWidth: 3,
            },
          ],
        };
      case 'spoilage':
        return {
          labels,
          datasets: [
            {
              data: historicalData.map(item => item.spoilage),
              color: (opacity = 1) => Colors.danger + Math.round(opacity * 255).toString(16).padStart(2, '0'),
              strokeWidth: 3,
            },
          ],
        };
      default:
        return { labels: [], datasets: [] };
    }
  };

  const PeriodButton = ({ period, label }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        selectedPeriod === period && styles.periodButtonActive
      ]}
      onPress={() => setSelectedPeriod(period)}
    >
      <Text style={[
        styles.periodText,
        selectedPeriod === period && styles.periodTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const ChartTypeButton = ({ type, label, icon, color }) => (
    <TouchableOpacity
      style={[
        styles.chartTypeButton,
        selectedChart === type && styles.chartTypeButtonActive
      ]}
      onPress={() => setSelectedChart(type)}
    >
      <Ionicons 
        name={icon} 
        size={20} 
        color={selectedChart === type ? Colors.surface : color} 
      />
      <Text style={[
        styles.chartTypeText,
        selectedChart === type && styles.chartTypeTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const SummaryCard = ({ title, value, unit, change, icon, color }) => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <View style={[styles.summaryIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.summaryInfo}>
          <Text style={styles.summaryTitle}>{title}</Text>
          <View style={styles.summaryValueRow}>
            <Text style={styles.summaryValue}>{value}</Text>
            <Text style={styles.summaryUnit}>{unit}</Text>
          </View>
        </View>
      </View>
      <View style={styles.summaryChange}>
        <Ionicons 
          name={change >= 0 ? 'trending-up' : 'trending-down'} 
          size={16} 
          color={change >= 0 ? Colors.safe : Colors.danger} 
        />
        <Text style={[
          styles.changeText,
          { color: change >= 0 ? Colors.safe : Colors.danger }
        ]}>
          {Math.abs(change)}% from yesterday
        </Text>
      </View>
    </View>
  );

  const EfficiencyReport = () => (
    <View style={styles.reportCard}>
      <Text style={styles.reportTitle}>System Efficiency</Text>
      <View style={styles.efficiencyGrid}>
        <View style={styles.efficiencyItem}>
          <Text style={styles.efficiencyLabel}>Energy Usage</Text>
          <Text style={[styles.efficiencyValue, { color: Colors.safe }]}>92%</Text>
          <Text style={styles.efficiencyDescription}>Optimal</Text>
        </View>
        <View style={styles.efficiencyItem}>
          <Text style={styles.efficiencyLabel}>Preservation Rate</Text>
          <Text style={[styles.efficiencyValue, { color: Colors.safe }]}>96%</Text>
          <Text style={styles.efficiencyDescription}>Excellent</Text>
        </View>
        <View style={styles.efficiencyItem}>
          <Text style={styles.efficiencyLabel}>Alert Response</Text>
          <Text style={[styles.efficiencyValue, { color: Colors.warning }]}>85%</Text>
          <Text style={styles.efficiencyDescription}>Good</Text>
        </View>
      </View>
    </View>
  );

  const PredictiveAnalytics = () => (
    <View style={styles.reportCard}>
      <Text style={styles.reportTitle}>Predictive Analytics</Text>
      <View style={styles.predictionList}>
        <View style={styles.predictionItem}>
          <View style={[styles.predictionIcon, { backgroundColor: Colors.warning + '20' }]}>
            <Ionicons name="time" size={20} color={Colors.warning} />
          </View>
          <View style={styles.predictionInfo}>
            <Text style={styles.predictionText}>
              Rack B may need attention in 2-3 days
            </Text>
            <Text style={styles.predictionSubtext}>Based on current humidity trends</Text>
          </View>
        </View>
        
        <View style={styles.predictionItem}>
          <View style={[styles.predictionIcon, { backgroundColor: Colors.primary + '20' }]}>
            <Ionicons name="beaker" size={20} color={Colors.primary} />
          </View>
          <View style={styles.predictionInfo}>
            <Text style={styles.predictionText}>
              Herbal fluid refill needed in 5 days
            </Text>
            <Text style={styles.predictionSubtext}>At current consumption rate</Text>
          </View>
        </View>
        
        <View style={styles.predictionItem}>
          <View style={[styles.predictionIcon, { backgroundColor: Colors.safe + '20' }]}>
            <Ionicons name="leaf" size={20} color={Colors.safe} />
          </View>
          <View style={styles.predictionInfo}>
            <Text style={styles.predictionText}>
              Optimal preservation conditions maintained
            </Text>
            <Text style={styles.predictionSubtext}>Expected 98% preservation rate</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const ExportButton = () => (
    <TouchableOpacity style={styles.exportButton}>
      <Ionicons name="download" size={20} color={Colors.surface} />
      <Text style={styles.exportText}>Export Report</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Summary Cards */}
      <View style={styles.summaryGrid}>
        <SummaryCard
          title="Avg Temperature"
          value="19.2"
          unit="°C"
          change={2.1}
          icon="thermometer"
          color={Colors.primary}
        />
        <SummaryCard
          title="Avg Humidity"
          value="67"
          unit="%"
          change={-1.5}
          icon="water"
          color={Colors.safe}
        />
      </View>
      
      <View style={styles.summaryGrid}>
        <SummaryCard
          title="Spoilage Rate"
          value="3.2"
          unit="%"
          change={-0.8}
          icon="alert-circle"
          color={Colors.danger}
        />
        <SummaryCard
          title="Energy Usage"
          value="142"
          unit="kWh"
          change={5.2}
          icon="flash"
          color={Colors.warning}
        />
      </View>

      {/* Chart Section */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Historical Trends</Text>
        
        <View style={styles.periodSelector}>
          <PeriodButton period="24h" label="24h" />
          <PeriodButton period="7d" label="7 days" />
          <PeriodButton period="30d" label="30 days" />
        </View>

        <View style={styles.chartTypeSelector}>
          <ChartTypeButton 
            type="temperature" 
            label="Temp" 
            icon="thermometer" 
            color={Colors.primary} 
          />
          <ChartTypeButton 
            type="humidity" 
            label="Humidity" 
            icon="water" 
            color={Colors.safe} 
          />
          <ChartTypeButton 
            type="ethylene" 
            label="Ethylene" 
            icon="leaf" 
            color={Colors.warning} 
          />
          <ChartTypeButton 
            type="spoilage" 
            label="Spoilage" 
            icon="alert-circle" 
            color={Colors.danger} 
          />
        </View>

        <LineChart
          data={getChartData()}
          width={width - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <EfficiencyReport />
      <PredictiveAnalytics />
      <ExportButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  summaryGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  summaryValue: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
  },
  summaryUnit: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  summaryChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  changeText: {
    fontSize: Fonts.sizes.small,
    fontWeight: '500',
  },
  chartCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  chartTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  periodButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.medium,
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
  },
  periodText: {
    fontSize: Fonts.sizes.small,
    color: Colors.primary,
    fontWeight: '500',
  },
  periodTextActive: {
    color: Colors.surface,
  },
  chartTypeSelector: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  chartTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.medium,
    gap: Spacing.xs,
  },
  chartTypeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chartTypeText: {
    fontSize: Fonts.sizes.small,
    color: Colors.text,
    fontWeight: '500',
  },
  chartTypeTextActive: {
    color: Colors.surface,
  },
  chart: {
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
  },
  reportCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    marginTop: 0,
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    elevation: 2,
  },
  reportTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  efficiencyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  efficiencyItem: {
    alignItems: 'center',
  },
  efficiencyLabel: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  efficiencyValue: {
    fontSize: Fonts.sizes.xxlarge,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  efficiencyDescription: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  predictionList: {
    gap: Spacing.md,
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  predictionIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  predictionInfo: {
    flex: 1,
  },
  predictionText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.text,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  predictionSubtext: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  exportButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    gap: Spacing.sm,
  },
  exportText: {
    color: Colors.surface,
    fontSize: Fonts.sizes.medium,
    fontWeight: 'bold',
  },
});

export default ReportsScreen;