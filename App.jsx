import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './src/context/LanguageContext.jsx';
import { AuthProvider } from './src/context/AuthContext.jsx';
import { DataProvider } from './src/context/DataContext.jsx';
import AppNavigation from './src/navigation/AppNavigation.jsx';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <StatusBar style="light" backgroundColor="#2E7D32" />
          <AppNavigation />
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
