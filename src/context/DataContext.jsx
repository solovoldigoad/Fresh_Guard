import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext({});

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider =
 ({ children }) => {
  const [sensorData, setSensorData] = useState({
    temperature: 18,
    humidity: 65,
    ethylene: 0.8,
    weight: 1250,
  });

  const [controls, setControls] = useState({
    fans: false,
    vents: false,
    herbalSprinkler: false,
    autoMode: true,
  });

  const [alerts, setAlerts] = useState([]);
  const [racks, setRacks] = useState([
    { id: 'A', name: 'Rack A', status: 'healthy', weight: 350, lastUpdated: new Date() },
    { id: 'B', name: 'Rack B', status: 'warning', weight: 280, lastUpdated: new Date() },
    { id: 'C', name: 'Rack C', status: 'healthy', weight: 420, lastUpdated: new Date() },
    { id: 'D', name: 'Rack D', status: 'spoiled', weight: 200, lastUpdated: new Date() },
  ]);

  const [herbalFluidLevel, setHerbalFluidLevel] = useState(75);
  const [isOnline, setIsOnline] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline) {
        updateSensorData();
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isOnline]);

  const updateSensorData = () => {
    setSensorData(prev => ({
      temperature: Math.max(15, Math.min(25, prev.temperature + (Math.random() - 0.5) * 2)),
      humidity: Math.max(50, Math.min(80, prev.humidity + (Math.random() - 0.5) * 5)),
      ethylene: Math.max(0.1, Math.min(2.0, prev.ethylene + (Math.random() - 0.5) * 0.2)),
      weight: Math.max(1000, Math.min(1500, prev.weight + (Math.random() - 0.5) * 10)),
    }));

    // Randomly generate alerts
    if (Math.random() < 0.1) { // 10% chance every update
      generateRandomAlert();
    }
  };

  const generateRandomAlert = () => {
    const alertTypes = [
      { type: 'temperature', message: 'High temperature detected', severity: 'warning' },
      { type: 'humidity', message: 'Humidity levels critical', severity: 'danger' },
      { type: 'spoilage', message: 'Rot detected in Rack D', severity: 'danger' },
      { type: 'fluid', message: 'Herbal fluid level low', severity: 'warning' },
      { type: 'ethylene', message: 'Ethylene levels elevated', severity: 'warning' },
    ];

    const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const newAlert = {
      id: Date.now().toString(),
      ...alert,
      timestamp: new Date(),
      read: false,
    };

    setAlerts(prev => [newAlert, ...prev.slice(0, 49)]); // Keep last 50 alerts
  };

  const toggleControl = (controlName) => {
    setControls(prev => ({
      ...prev,
      [controlName]: !prev[controlName],
    }));
  };

  const markAlertAsRead = (alertId) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const getSensorStatus = (type, value) => {
    switch (type) {
      case 'temperature':
        if (value < 16 || value > 22) return 'danger';
        if (value < 17 || value > 21) return 'warning';
        return 'safe';
      case 'humidity':
        if (value < 55 || value > 75) return 'danger';
        if (value < 60 || value > 70) return 'warning';
        return 'safe';
      case 'ethylene':
        if (value > 1.5) return 'danger';
        if (value > 1.0) return 'warning';
        return 'safe';
      case 'weight':
        if (value < 1100) return 'danger';
        if (value < 1200) return 'warning';
        return 'safe';
      default:
        return 'safe';
    }
  };

  const getHistoricalData = () => {
    // Generate dummy historical data for charts
    const data = [];
    for (let i = 23; i >= 0; i--) {
      data.push({
        time: new Date(Date.now() - i * 60 * 60 * 1000).getHours(),
        temperature: Math.random() * 10 + 15,
        humidity: Math.random() * 30 + 50,
        ethylene: Math.random() * 1.5 + 0.1,
        spoilage: Math.random() * 15 + 2,
      });
    }
    return data;
  };

  const value = {
    sensorData,
    controls,
    alerts,
    racks,
    herbalFluidLevel,
    isOnline,
    toggleControl,
    markAlertAsRead,
    getSensorStatus,
    getHistoricalData,
    setIsOnline,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};