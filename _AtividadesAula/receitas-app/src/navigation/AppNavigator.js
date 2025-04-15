import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FavoritasScreen from '../screens/FavoritasScreen';
import { Ionicons as Icon } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e74c3c',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{ 
          title: 'Home', 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Favoritas" 
        component={FavoritasScreen} 
        options={{ 
          title: 'Favoritas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}