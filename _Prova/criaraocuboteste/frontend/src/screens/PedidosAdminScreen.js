import { FlatList, Box, Text, VStack, Input, Button, Heading } from 'native-base';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function PedidosAdminScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [valores, setValores] = useState({});

  const fetchPedidos = async () => {
    const res = await api.get('/pedidos');
    setPedidos(res.data);
  };

  const enviarOrcamento = async (id) => {
    try {
      await api.put(`/pedidos/${id}/orcamento`, { valor: valores[id] });
      fetchPedidos();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelarPedido = async (id) => {
    try {
      await api.put(`/pedidos/${id}/cancelar`);
      fetchPedidos();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <VStack space={4} p={4}>
      <Heading>Pedidos Recebidos</Heading>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Box borderWidth={1} borderRadius="lg" p={3} mb={2}>
            <Text bold>{item.descricao}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Cliente: {item.user?.nome}</Text>

            {item.status === 'pendente' && (
              <>
                <Input
                  placeholder="Valor do orçamento"
                  keyboardType="numeric"
                  value={valores[item._id] || ''}
                  onChangeText={(val) => setValores({ ...valores, [item._id]: val })}
                  mt={2}
                />
                <Button mt={1} onPress={() => enviarOrcamento(item._id)}>
                  Enviar Orçamento
                </Button>
                <Button mt={1} colorScheme="danger" onPress={() => cancelarPedido(item._id)}>
                  Cancelar
                </Button>
              </>
            )}
          </Box>
        )}
      />
    </VStack>
  );
}
