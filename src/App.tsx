import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBar } from './components/common/DemoBar';
import { LoginScreen } from './components/auth/LoginScreen';
import { DashboardScreen } from './components/dashboard/DashboardScreen';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <div className="app-root">
      <DemoBar />
      {currentScreen === 'login' ? <LoginScreen /> : <DashboardScreen />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
