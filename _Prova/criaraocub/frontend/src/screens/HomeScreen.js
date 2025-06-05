import { useContext } from 'react';
import { Box, Button, Text, VStack } from 'native-base';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <Box flex={1} p={4}>
      <Text fontSize="xl" bold mb={6}>Bem-vindo, {user?.name}</Text>
      
      <VStack space={4}>
        <Button onPress={() => navigation.navigate('NewOrder')}>
          Novo Pedido
        </Button>
        
        {user?.role === 'admin' && (
          <Button onPress={() => navigation.navigate('Orders')}>
            Ver Pedidos
          </Button>
        )}
        
        <Button variant="outline" onPress={logout}>
          Sair
        </Button>
      </VStack>
    </Box>
  );
}