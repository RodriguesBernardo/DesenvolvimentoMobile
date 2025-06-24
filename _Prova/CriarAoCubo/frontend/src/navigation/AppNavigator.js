import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screens/HomeScreen';
import MeusOrcamentosScreen from '../screens/orcamentos/MeusOrcamentosScreen';
import EnviarOrcamentoScreen from '../screens/orcamentos/EnviarOrcamentoScreen';
import OrcamentoDetalhesScreen from '../screens/orcamentos/orcamentoDetalhes';
import OrcamentoDetalhesAdminScreen from '../screens/admin/OrcamentoDetalhesAdminScreen'; // Certifique-se de importar
import AdminOrcamentosScreen from '../screens/admin/AdminOrcamentosScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MeusOrcamentos" component={MeusOrcamentosScreen} />
          <Stack.Screen name="EnviarOrcamento" component={EnviarOrcamentoScreen} />
          <Stack.Screen 
            name="OrcamentoDetalhes" 
            component={usuario.isAdmin ? OrcamentoDetalhesAdminScreen : OrcamentoDetalhesScreen} 
          />
          {usuario.isAdmin && (
            <Stack.Screen name="AdminOrcamentos" component={AdminOrcamentosScreen} />
          )}
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;