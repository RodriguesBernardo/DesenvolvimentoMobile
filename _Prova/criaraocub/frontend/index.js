import { registerRootComponent } from 'expo';
import App from './App';
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Invalid value used as weak map key',
  'Require cycle:'
]);

// Add global error handler
const originalErrorHandler = ErrorUtils.getGlobalHandler();

ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.error('Global error handler:', error, isFatal);
  originalErrorHandler(error, isFatal);
});

registerRootComponent(App);