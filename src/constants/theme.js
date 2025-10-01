export const Colors = {
  // Primary Theme Colors
   // 🌱 Primary Theme
   primary: '#7B3F61',     // Deep Onion Purple (brand identity)
   secondary: '#C97C2B',   // Golden Brown (onion skin/warehouse crates)
   accent: '#2E7D32',      // Fresh Green (safe, agri-preservation)
 
   // 🚦 Status Indicators
   safe: '#4CAF50',        // Green - Safe storage
   warning: '#FFB300',     // Amber - Warning
   danger: '#D32F2F',      // Strong Red - Spoilage/Danger
 
   // 🖥 UI Neutrals
   background: '#F8F3E7',  // Onion flesh off-white (soft, clean)
   surface: '#FFFFFF',     // Pure white cards
   text: '#212121',        // Dark text
   textSecondary: '#616161', // Muted grey for subtitles
   border: '#E0E0E0',      // Light grey for dividers
   disabled: '#BDBDBD',    // Disabled elements
 
  
  // Gradients
  primaryGradient: ['#2E7D32', '#4CAF50'],
  warningGradient: ['#FF9800', '#FFC107'],
  dangerGradient: ['#F44336', '#E53935'],
};

export const Fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 20,
};

export const UserRoles = {
  WAREHOUSE_STAFF: 'warehouse_staff',
  ADMIN: 'admin',
};