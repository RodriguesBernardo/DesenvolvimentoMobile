// src/navigation/MainStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NoticiasScreen from '../screens/NoticiasScreen';
import PedidoFormScreen from '../screens/PedidoFormScreen';
import PedidosClienteScreen from '../screens/PedidosClienteScreen';
import PedidosAdminScreen from '../screens/PedidosAdminScreen';
import NovaNoticiaScreen from '../screens/NovaNoticiaScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Noticias" component={NoticiasScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="NovoPedido" component={PedidoFormScreen} />
      <Stack.Screen name="MeusPedidos" component={PedidosClienteScreen} />
      <Stack.Screen name="PedidosAdmin" component={PedidosAdminScreen} />
      <Stack.Screen name="NovaNoticia" component={NovaNoticiaScreen} />
    </Stack.Navigator>
  );
}