import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../telas/LoginScreen';
import CadastroScreen from '../telas/CadastroScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="Cadastro" 
        component={CadastroScreen} 
        options={{ title: 'Criar Conta' }}
      />
    </Stack.Navigator>
  );
}