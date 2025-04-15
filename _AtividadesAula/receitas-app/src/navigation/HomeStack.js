import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriasScreen from '../screens/Home/CategoriasScreen';
import ReceitasScreen from '../screens/Home/ReceitasScreen';
import ReceitaDetalhesScreen from '../screens/Home/ReceitaDetalhesScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Categorias" 
        component={CategoriasScreen} 
        options={{ title: 'Categorias de Receitas' }} 
      />
      <Stack.Screen 
        name="Receitas" 
        component={ReceitasScreen} 
        options={({ route }) => ({ title: route.params.categoria })} 
      />
      <Stack.Screen 
        name="ReceitaDetalhes" 
        component={ReceitaDetalhesScreen} 
        options={{ title: 'Detalhes da Receita' }} 
      />
    </Stack.Navigator>
  );
}