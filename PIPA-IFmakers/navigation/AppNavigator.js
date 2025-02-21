// navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import HelpScreen from '../screens/HelpScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import HelpDetailScreen from '../screens/HelpDetailScreen';

// Cria os navegadores
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const HelpStack = createStackNavigator();

// Função para configurar os ícones das abas
const getTabIcon = (routeName, focused, color, size) => {
  let iconName;

  switch (routeName) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'About':
      iconName = focused ? 'information-circle' : 'information-circle-outline';
      break;
    case 'Help':
      iconName = focused ? 'help-circle' : 'help-circle-outline';
      break;
    default:
      iconName = 'help-circle-outline'; // Ícone padrão
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

// Stack Navigator para a tela Home
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }} // Oculta o cabeçalho da tela Home
    />
    <HomeStack.Screen
      name="NewsDetail"
      component={NewsDetailScreen}
      options={{ title: 'Detalhes da Notícia' }}
    />
  </HomeStack.Navigator>
);

// Stack Navigator para a tela Help
const HelpStackScreen = () => (
  <HelpStack.Navigator>
    <HelpStack.Screen
      name="Help"
      component={HelpScreen}
      options={{ headerShown: false }} // Oculta o cabeçalho da tela Help
    />
    <HelpStack.Screen
      name="HelpDetail"
      component={HelpDetailScreen}
      options={{ title: 'Detalhes da Ajuda' }}
    />
  </HelpStack.Navigator>
);

// Componente principal do AppNavigator
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          getTabIcon(route.name, focused, color, size), // Usa a função getTabIcon
        tabBarActiveTintColor: '#6200ee', // Cor do ícone ativo
        tabBarInactiveTintColor: 'gray', // Cor do ícone inativo
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen} // Usa o HomeStackScreen
        options={{ title: 'Início' }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'Sobre' }}
      />
      <Tab.Screen
        name="Help"
        component={HelpStackScreen} // Usa o HelpStackScreen
        options={{ title: 'Ajuda' }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;