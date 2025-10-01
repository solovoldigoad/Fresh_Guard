# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Smart Herbal Sprinkler is a React Native mobile application for climate-controlled onion storage warehouse monitoring. Built for Smart India Hackathon 2024, it provides real-time monitoring, automated control systems, and predictive analytics for agricultural storage preservation.

## Development Commands

### Setup and Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Platform-specific builds
npm run android    # Android development
npm run ios       # iOS development (macOS only)
npm run web       # Web development
```

### Development Workflow
```bash
# Start Expo development server
expo start

# Run on specific platforms
expo start --android
expo start --ios
expo start --web

# Clear cache if needed
expo start --clear
```

### Testing and Debugging
```bash
# Clear Metro cache
npx expo start --clear

# Reset development environment
npx expo install --fix

# Clear AsyncStorage (for testing auth flows)
# Use the DevResetButton component in development builds
```

## Architecture Overview

### Context-Driven State Management
The app uses React Context API for state management with three main contexts:

- **AuthContext**: Manages user authentication, roles (Warehouse Staff/Admin), and session persistence
- **DataContext**: Handles real-time sensor data, controls, alerts, and inventory management with simulated IoT data updates
- **LanguageContext**: Provides multilingual support (English/Hindi) with persistent language preferences

### Navigation Structure
```
App (Root)
├── AuthFlow (Stack Navigator)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   └── SignupScreen
└── MainFlow (Stack Navigator)
    ├── TabNavigator (Bottom Tabs)
    │   ├── Dashboard (Home monitoring)
    │   ├── Control (Manual system controls)
    │   ├── Alerts (Notifications & warnings)
    │   ├── Inventory (Rack management)
    │   └── Reports (Admin-only analytics)
    └── Settings (Modal/Stack screen)
```

### Component Architecture
- **Screen Components**: Full-screen views handling specific app functionality
- **Reusable Components**: `MonitoringCard.jsx` for sensor displays, `LanguageSelector.jsx`, `DevResetButton.jsx`
- **Context Providers**: Wrap the entire app providing global state
- **Constants**: Theme colors, typography, spacing, translations, and user roles

### Data Flow Patterns
1. **Real-time Simulation**: DataContext updates sensor values every 5 seconds
2. **Offline-First**: AsyncStorage caches all critical data
3. **Role-Based Access**: Admin vs Warehouse Staff feature differentiation
4. **Alert Generation**: Random alerts simulate real IoT sensor warnings

## Key Technical Details

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── MonitoringCard.jsx
│   ├── LanguageSelector.jsx
│   └── DevResetButton.jsx
├── screens/            # Main application screens
│   ├── LoginScreen.jsx
│   ├── DashboardScreen.jsx
│   ├── ControlScreen.jsx
│   ├── AlertsScreen.jsx
│   ├── InventoryScreen.jsx
│   └── ReportsScreen.jsx
├── navigation/         # Navigation configuration
│   └── AppNavigation.jsx
├── context/           # React Context providers
│   ├── AuthContext.jsx
│   ├── DataContext.jsx
│   └── LanguageContext.jsx
├── constants/         # App constants and configuration
│   ├── theme.js       # Colors, fonts, spacing
│   └── translations.js # Multilingual strings
└── utils/            # Utility functions
    └── clearStorage.js
```

### Authentication System
- **Login**: Demo OTP system (use `1234` as OTP for any 10-digit phone number)
- **Signup**: New user registration with full name, email, phone number, and warehouse code
- **OTP Verification**: Same demo OTP (`1234`) for both login and signup flows
- Role-based access control with `UserRoles.WAREHOUSE_STAFF` and `UserRoles.ADMIN`
- Persistent login state via AsyncStorage
- First-time user welcome flow
- Navigation between Login and Signup screens

### Theming System
The app uses a custom theme system with:
- **Primary Colors**: Deep onion purple (`#7B3F61`), golden brown (`#C97C2B`), fresh green (`#2E7D32`)
- **Status Colors**: Green (safe), amber (warning), red (danger)
- **Typography**: System fonts with consistent sizing scale
- **Spacing**: Standardized spacing units (xs: 4px, sm: 8px, md: 16px, etc.)

### Internationalization (i18n)
- Full English and Hindi language support
- Language switching available from login screen, dashboard, or settings
- Persistent language preference via AsyncStorage
- Comprehensive translation coverage for all UI elements

## Development Guidelines

### State Management Patterns
- Use Context hooks (`useAuth`, `useData`, `useLanguage`) instead of direct context imports
- Sensor data simulation runs in DataContext with automatic cleanup
- AsyncStorage operations should always include error handling

### Component Development
- All React components use `.jsx` extension (converted from `.js` for better IDE support)
- Use the established theme system from `src/constants/theme.js`
- Follow the existing color coding pattern for sensor status indicators

### Testing Scenarios
- **Login Flow**: Use any 10-digit phone number with OTP `1234`
- **Signup Flow**: Create new account with any valid details, use OTP `1234` for verification
- **Navigation**: Switch between Login and Signup screens using the bottom links
- **Role Testing**: Switch between Warehouse Staff and Admin roles to test feature access
- **Warehouse Code**: Required field for Warehouse Staff role during signup
- **Data Simulation**: Sensor values update every 5 seconds with realistic fluctuations
- **Offline Mode**: Use connection toggle to test SMS alert fallback
- **Language Switching**: Test UI in both English and Hindi

### Demo Data Configuration
The app includes realistic demo data:
- Temperature: 15-25°C with status thresholds
- Humidity: 50-80% with optimal ranges
- Ethylene gas: 0.1-2.0 ppm monitoring
- Weight: 1000-1500 kg capacity tracking
- 4 storage racks with different health statuses
- Random alert generation for realistic testing

### Expo Configuration
- Uses Expo SDK ~54.0.9
- Metro bundler configured for `.jsx` support
- New Architecture enabled for React Native
- Supports Android, iOS, and Web platforms
- Custom app icons and splash screens configured

## Agricultural Context

This is an agricultural technology solution specifically designed for:
- Climate-controlled onion storage monitoring
- Real-time environmental parameter tracking
- Automated herbal sprinkler control systems
- Spoilage prediction and prevention
- Farmer-friendly multilingual interface
- Offline functionality for rural connectivity

The app addresses preservation of agricultural produce through technology while maintaining accessibility for farmers and warehouse staff through intuitive design and multilingual support.