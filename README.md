# Smart Herbal Sprinkler – Climate-Controlled Onion Storage App

A comprehensive React Native mobile application for warehouse monitoring and control of the Smart Herbal Sprinkler climate-controlled onion storage system.

## 🚀 Features

### 🔑 User Roles
- **Warehouse Staff**: View live storage conditions, receive alerts, manual control of systems
- **Admin**: All staff permissions + full analytics, reports, and user management

### 🖥 Core Features

#### Authentication & Onboarding
- Role-based login (Warehouse Staff / Admin)
- Phone number + OTP authentication (demo: use 1234 as OTP)
- Simple, farmer-friendly interface

#### Dashboard (Home Screen)
- Real-time monitoring cards for:
  - 🌡 Temperature (°C)
  - 💧 Humidity (%)
  - 🍃 Ethylene gas (ppm)
  - ⚖ Weight of onions (kg)
- Color-coded indicators (Green = Safe, Yellow = Warning, Red = Alert)
- System status overview
- Quick action buttons

#### Control Panel
- Manual ON/OFF toggles for:
  - Fans
  - Vents
  - Herbal Sprinkler
- Auto Mode switch for system-controlled adjustments
- Real-time system status
- Herbal fluid level monitoring

#### Alerts & Notifications
- Alert feed with timestamps
- Push notification simulation
- Offline SMS alert mode
- Filterable alerts (All, Unread, Critical)

#### Inventory Management
- Rack/Shelf visualization (Rack A, B, C, D)
- Health status indicators:
  - 🟢 Green = Healthy onions
  - 🟡 Yellow = Warning state
  - 🔴 Red = Spoiled onions detected
- Warehouse layout visualization
- Fluid refill alerts for herbal mist

#### Analytics & Reports (Admin Only)
- Spoilage prediction graphs
- Temperature/Humidity trend charts
- System efficiency metrics
- Predictive analytics
- Export functionality

### 🎨 Design
- **Theme Colors**:
  - Primary Green (#2E7D32) – Agriculture/freshness
  - Secondary Yellow (#FBC02D) – Onion association
  - Accent Red (#E53935) – Alerts
- **UI/UX**:
  - Bottom navigation with intuitive tabs
  - Rounded cards with large icons
  - Bold, farmer-friendly typography
  - **Multilingual Support**: English + Hindi

### 📊 Tech Stack
- **Frontend**: React Native with Expo (JSX components)
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: React Context API
- **Charts**: React Native Chart Kit
- **Storage**: AsyncStorage for offline-first approach
- **Styling**: StyleSheet with consistent theming
- **Icons**: Expo Vector Icons (Ionicons)

## 🛠 Installation & Setup

### Prerequisites
- Node.js (14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Quick Start

1. **Clone and Install**
   ```bash
   cd SmartHerbalSprinkler
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```

3. **Run on Device/Emulator**
   ```bash
   # Android
   npm run android
   
   # iOS (macOS only)
   npm run ios
   
   # Web
   npm run web
   ```

## 🎯 Demo Instructions

### Login Credentials
- **Phone Number**: Any 10-digit number
- **OTP**: `1234` (for demo purposes)
- **Roles**: Choose between Warehouse Staff or Admin

### Default Demo Data
- Temperature: ~18°C (fluctuates)
- Humidity: ~65% (fluctuates)
- Ethylene: ~0.8 ppm (fluctuates)
- Weight: ~1250 kg (fluctuates)
- 4 Storage racks with different health statuses
- Sample alerts with various severity levels

### Key Demo Features
1. **Real-time Data**: Sensor values update every 5 seconds
2. **Interactive Controls**: Toggle fans, vents, and sprinkler manually
3. **Auto Mode**: Enable/disable automatic system control
4. **Alert Generation**: Random alerts are generated periodically
5. **Offline Mode**: Toggle connection status to simulate SMS fallback
6. **Language Switch**: Switch between English and Hindi
7. **Role-based Access**: Login as Admin to access Reports tab

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   └── MonitoringCard.jsx
├── screens/            # Main app screens
│   ├── LoginScreen.jsx
│   ├── DashboardScreen.jsx
│   ├── ControlScreen.jsx
│   ├── AlertsScreen.jsx
│   ├── InventoryScreen.jsx
│   └── ReportsScreen.jsx
├── navigation/         # Navigation configuration
│   └── AppNavigation.jsx
├── context/           # State management
│   ├── AuthContext.jsx
│   ├── DataContext.jsx
│   └── LanguageContext.jsx
├── constants/         # App constants and themes
│   ├── theme.js
│   └── translations.js
├── services/          # External services (future use)
└── utils/            # Utility functions (future use)
```

## 🌟 Key Highlights

### Offline-First Architecture
- Local data caching with AsyncStorage
- SMS alert fallback simulation
- Last known data display when offline

### Real-time Simulation
- Live sensor data updates
- Dynamic alert generation
- System status changes

### Farmer-Friendly Design
- Large, clear icons and typography
- Intuitive color coding
- Simple navigation structure
- Multilingual support (English/Hindi)

### Admin Dashboard
- Comprehensive analytics
- Historical trend charts
- Predictive insights
- Export capabilities

## 📋 Future Enhancements

- [ ] Firebase integration for real backend
- [ ] Push notifications with FCM
- [ ] Bluetooth/IoT sensor connectivity
- [ ] Advanced ML predictions
- [ ] Multi-warehouse support
- [ ] SMS gateway integration
- [ ] Detailed user management

## 🏆 SIH 2024 Compliance

This app addresses the Smart India Hackathon 2024 problem statement for agricultural technology:

- ✅ Climate-controlled storage monitoring
- ✅ Real-time sensor data visualization  
- ✅ Automated alert systems
- ✅ Predictive analytics for spoilage prevention
- ✅ Farmer-friendly interface design
- ✅ Offline functionality for rural areas
- ✅ Multilingual support for accessibility
- ✅ Cost-effective mobile solution

---

**Built with ❤️ for farmers and agricultural innovation**