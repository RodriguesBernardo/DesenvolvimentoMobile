import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View } from 'react-native';

// Importe as telas
import WelcomeScreen from './pages/Welcome';
import RandomNumberGenerator from './pages/RandomNumberGenerator';
import Stopwatch from './pages/Stopwatch';
import Counter from './pages/Counter';
import ThemeSwitcher from './pages/ThemeSwitcher';

// Tela Inicial (HomeScreen)
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>
      <Button
        title="Boas-Vindas"
        onPress={() => navigation.navigate('Welcome')}
      />
      <Button
        title="Gerador de Números"
        onPress={() => navigation.navigate('RandomNumberGenerator')}
      />
      <Button
        title="Cronômetro"
        onPress={() => navigation.navigate('Stopwatch')}
      />
      <Button
        title="Contador"
        onPress={() => navigation.navigate('Counter')}
      />
      <Button
        title="Trocador de Tema"
        onPress={() => navigation.navigate('ThemeSwitcher')}
      />
    </View>
  );
};

// Configuração do Navegador
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: 'Boas-Vindas' }}
        />
        <Stack.Screen
          name="RandomNumberGenerator"
          component={RandomNumberGenerator}
          options={{ title: 'Gerador de Números' }}
        />
        <Stack.Screen
          name="Stopwatch"
          component={Stopwatch}
          options={{ title: 'Cronômetro' }}
        />
        <Stack.Screen
          name="Counter"
          component={Counter}
          options={{ title: 'Contador' }}
        />
        <Stack.Screen
          name="ThemeSwitcher"
          component={ThemeSwitcher}
          options={{ title: 'Trocador de Tema' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;