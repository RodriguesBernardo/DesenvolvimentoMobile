import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, Animated } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import HelpScreen from './screens/HelpScreen';
import ContatosScreen from './screens/ContatosScreen';
import RecursosScreen from './screens/RecursosScreen';
import AboutScreen from './screens/AboutScreen';
import VisitasScreen from './screens/VisitasScreen';

const Stack = createStackNavigator();

export default function App() {
  const headerColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(headerColor, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: false,
        }),
        Animated.timing(headerColor, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const interpolatedColor = headerColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#b42622', '#46b422'],
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('./assets/icon.png')} style={{ width: 24, height: 24, marginRight: 8 }} />
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>PIPA IFMakeRS</Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: interpolatedColor,
            },
            headerTintColor: '#28a745',
          }}
        />
        <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Dicas Rápidas' }} />
        <Stack.Screen name="Contatos" component={ContatosScreen} options={{ title: 'Contatos' }} />
        <Stack.Screen name="Recursos" component={RecursosScreen} options={{ title: 'Recursos Úteis' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre o PIPA' }} />
        <Stack.Screen name="Visitas" component={VisitasScreen} options={{ title: 'Visitas' }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
