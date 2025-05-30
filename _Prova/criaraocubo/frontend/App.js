import React from 'react';
import { AuthProvider } from './src/contexto/AuthContext';
import AppNavigator from './src/navegacao/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}