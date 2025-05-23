import React from 'react';
import { AuthProvider } from './src/contexto/AuthProvider';
import AppNavigator from './src/navegacao/AppNavigator';
import { bootstrap } from './src/estilos/bootstrapStyles';

// Importar estilos bootstrap globalmente
bootstrap;

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}