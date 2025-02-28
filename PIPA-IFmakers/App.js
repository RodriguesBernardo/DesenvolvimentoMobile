import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import HelpScreen from './screens/HelpScreen';
import ContatosScreen from './screens/ContatosScreen';
import RecursosScreen from './screens/RecursosScreen';
import AboutScreen from './screens/AboutScreen';
import VisitasScreen from './screens/VisitasScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('./assets/icon.png')} style={{ width: 24, height: 24, marginRight: 8 }}/>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>PIPA IFMakeRS</Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#b42622', // Cor de fundo da barra de navegação
            },
            headerTintColor: '#28a745', // Cor do ícone de voltar e outros elementos
          }}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={{ title: 'Dicas Rápidas' }}
        />
        <Stack.Screen
          name="Contatos"
          component={ContatosScreen}
          options={{ title: 'Contatos' }}
        />
        <Stack.Screen
          name="Recursos"
          component={RecursosScreen}
          options={{ title: 'Recursos Úteis' }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Sobre o PIPA' }}
        />
        <Stack.Screen
          name="Visitas"
          component={VisitasScreen}
          options={{ title: 'Visitas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}