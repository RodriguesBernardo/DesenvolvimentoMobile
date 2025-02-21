// navigation/AppNavigator.js
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import HelpScreen from '../screens/HelpScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se o admin está logado

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Help') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'lock-closed' : 'lock-closed-outline'; // Ícone para a aba Admin
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início' }}
        initialParams={{ isAdmin }} // Passa o estado isAdmin para a HomeScreen
      />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Sobre' }} />
      <Tab.Screen name="Help" component={HelpScreen} options={{ title: 'Ajuda' }} />
      <Tab.Screen
        name="Admin"
        component={LoginScreen}
        options={{ title: 'Admin' }}
        initialParams={{ setIsAdmin }} // Passa a função setIsAdmin para a LoginScreen
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;