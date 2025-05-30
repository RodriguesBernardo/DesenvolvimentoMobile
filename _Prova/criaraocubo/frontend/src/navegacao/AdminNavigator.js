import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboardScreen from '../telas/AdminDashboardScreen';
import AdminPedidosScreen from '../telas/AdminPedidosScreen';
import AdminDetalhePedidoScreen from '../telas/AdminDetalhePedidoScreen';
import AdminUsuariosScreen from '../telas/AdminUsuariosScreen';
import AdminMateriaisScreen from '../telas/AdminMateriaisScreen';

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AdminDashboard" 
        component={AdminDashboardScreen} 
        options={{ title: 'Painel Admin' }}
      />
      <Stack.Screen 
        name="AdminPedidos" 
        component={AdminPedidosScreen} 
        options={{ title: 'Todos os Pedidos' }}
      />
      <Stack.Screen 
        name="AdminDetalhePedido" 
        component={AdminDetalhePedidoScreen} 
        options={{ title: 'Detalhes do Pedido' }}
      />
      <Stack.Screen 
        name="AdminUsuarios" 
        component={AdminUsuariosScreen} 
        options={{ title: 'Gerenciar Usuários' }}
      />
      <Stack.Screen 
        name="AdminMateriais" 
        component={AdminMateriaisScreen} 
        options={{ title: 'Gerenciar Materiais' }}
      />
    </Stack.Navigator>
  );
}