import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function PedidosClienteScreen() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Simulação de requisição ao backend
    const pedidosExemplo = [
      { id: '1', descricao: 'Miniatura de robô', status: 'Pendente', arquivo: 'robo.stl' },
      { id: '2', descricao: 'Engrenagem personalizada', status: 'Orçado', arquivo: 'gear.obj' },
      { id: '3', descricao: 'Chaveiro com logo', status: 'Cancelado', arquivo: 'chaveiro.stl' },
    ];

    setPedidos(pedidosExemplo);
    // Aqui você faria fetch() ou axios.get() para seu backend real
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido #{item.id}</Text>
      <Text>Descrição: {item.descricao}</Text>
      <Text>Arquivo: {item.arquivo}</Text>
      <Text style={[styles.status, getStatusColor(item.status)]}>Status: {item.status}</Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Orçado':
        return { color: 'green' };
      case 'Cancelado':
        return { color: 'red' };
      default:
        return { color: 'orange' };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum pedido encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  status: { marginTop: 5, fontWeight: 'bold' },
});
