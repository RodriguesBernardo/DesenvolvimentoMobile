import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../telas/HomeScreen';
import PedidoFormScreen from '../telas/PedidoFormScreen';
import MeusPedidosScreen from '../telas/MeusPedidosScreen';
import DetalhePedidoScreen from '../telas/DetalhePedidoScreen';
import ContatoScreen from '../telas/ContatoScreen';
import PerfilScreen from '../telas/PerfilScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Criar³ - Impressão 3D' }}
      />
      <Stack.Screen 
        name="NovoPedido" 
        component={PedidoFormScreen} 
        options={{ title: 'Novo Pedido' }}
      />
      <Stack.Screen 
        name="MeusPedidos" 
        component={MeusPedidosScreen} 
        options={{ title: 'Meus Pedidos' }}
      />
      <Stack.Screen 
        name="DetalhePedido" 
        component={DetalhePedidoScreen} 
        options={{ title: 'Detalhes do Pedido' }}
      />
      <Stack.Screen 
        name="Contato" 
        component={ContatoScreen} 
        options={{ title: 'Contato' }}
      />
      <Stack.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{ title: 'Meu Perfil' }}
      />
    </Stack.Navigator>
  );
}