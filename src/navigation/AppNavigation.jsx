import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext.jsx';
import { Colors, UserRoles } from '../constants/theme';

// Screens
import SplashScreen from '../screens/SplashScreen.jsx';
import WelcomeScreen from '../screens/WelcomeScreen.jsx';
import LoginScreen from '../screens/LoginScreen.jsx';
import DashboardScreen from '../screens/DashboardScreen.jsx';
import ControlScreen from '../screens/ControlScreen.jsx';
import AlertsScreen from '../screens/AlertsScreen.jsx';
import InventoryScreen from '../screens/InventoryScreen.jsx';
import ReportsScreen from '../screens/ReportsScreen.jsx';
import SettingsScreen from '../screens/SettingsScreen.jsx';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const { user, isAdmin } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Control':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Alerts':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Inventory':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Reports':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          headerTitle: 'Smart Herbal Sprinkler',
          headerTintColor: '#FFFFFF', // White color for header text and icons
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#FFFFFF', // White color for header title
          },
        }}
      />
      <Tab.Screen 
        name="Control" 
        component={ControlScreen}
        options={{
          title: 'Control',
          headerTitle: 'System Control',
        }}
      />
      <Tab.Screen 
        name="Alerts" 
        component={AlertsScreen}
        options={{
          title: 'Alerts',
          headerTitle: 'Alerts & Notifications',
        }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={InventoryScreen}
        options={{
          title: 'Inventory',
          headerTitle: 'Rack Management',
        }}
      />
      {isAdmin && (
        <Tab.Screen 
          name="Reports" 
          component={ReportsScreen}
          options={{
            title: 'Reports',
            headerTitle: 'Analytics & Reports',
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const AuthStackNavigator = () => {
  const { isFirstTime } = useAuth();
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Force Welcome Screen for development - Change this back later */}
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Tabs" 
      component={TabNavigator} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{
        title: 'Settings',
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.surface,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  </Stack.Navigator>
);

const AppNavigation = () => {
  const { user, loading } = useAuth();


  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen 
            name="Main" 
            component={MainStackNavigator} 
            options={{ gestureEnabled: false }}
          />
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthStackNavigator}
            options={{ gestureEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
