import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexto/AuthContext';
import LoginScreen from '../telas/LoginScreen';
import HomeScreen from '../telas/HomeScreen';
import AdminHomeScreen from '../telas/admin/AdminHomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { usuario } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!usuario ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : usuario.isAdmin ? (
          <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}