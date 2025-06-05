import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { bootstrap } from '../estilos/bootstrapStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdminDetalhePedidoScreen = ({ route, navigation }) => {
  // Dados do pedido - em uma aplicação real, isso viria da API ou do contexto
  const [pedido, setPedido] = useState({
    id: route.params?.id || '12345',
    cliente: 'João Silva',
    data: '15/05/2023',
    status: 'Em processamento',
    itens: [
      { material: 'Concreto', quantidade: '10 m³', valor: 'R$ 1.200,00' },
      { material: 'Tijolos', quantidade: '500 un', valor: 'R$ 850,00' },
      { material: 'Areia', quantidade: '5 m³', valor: 'R$ 350,00' },
    ],
    total: 'R$ 2.400,00',
    endereco: 'Rua das Construções, 123 - Bairro Industrial'
  });

  const atualizarStatus = (novoStatus) => {
    setPedido({ ...pedido, status: novoStatus });
    // Aqui você chamaria a API para atualizar o status no backend
  };

  return (
    <ScrollView contentContainerStyle={bootstrap.styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detalhes do Pedido #{pedido.id}</Text>
        <Text style={styles.headerSubtitle}>Cliente: {pedido.cliente}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Icon name="event" size={20} color="#6c757d" />
          <Text style={styles.cardText}>Data: {pedido.data}</Text>
        </View>

        <View style={styles.cardRow}>
          <Icon name="place" size={20} color="#6c757d" />
          <Text style={styles.cardText}>Endereço: {pedido.endereco}</Text>
        </View>

        <View style={[styles.cardRow, { marginTop: 10 }]}>
          <Icon name="info" size={20} color="#6c757d" />
          <Text style={[styles.cardText, { color: getStatusColor(pedido.status) }]}>
            Status: {pedido.status}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Itens do Pedido</Text>
        {pedido.itens.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{item.material}</Text>
            <Text style={styles.itemDetail}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.itemDetail}>Valor: {item.valor}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total do Pedido: {pedido.total}</Text>
      </View>

      <View style={styles.actions}>
        <Text style={styles.actionsTitle}>Alterar Status:</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity 
            style={[styles.statusButton, { backgroundColor: '#ffc107' }]}
            onPress={() => atualizarStatus('Em processamento')}
          >
            <Text style={styles.buttonText}>Processando</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statusButton, { backgroundColor: '#17a2b8' }]}
            onPress={() => atualizarStatus('A caminho')}
          >
            <Text style={styles.buttonText}>A Caminho</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statusButton, { backgroundColor: '#28a745' }]}
            onPress={() => atualizarStatus('Entregue')}
          >
            <Text style={styles.buttonText}>Entregue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[bootstrap.styles.btnPrimary, { marginTop: 20 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Função auxiliar para cores de status
const getStatusColor = (status) => {
  switch (status) {
    case 'Em processamento': return '#ffc107';
    case 'A caminho': return '#17a2b8';
    case 'Entregue': return '#28a745';
    default: return '#6c757d';
  }
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40'
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 5
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#495057'
  },
  section: {
    width: '100%',
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529'
  },
  itemDetail: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4
  },
  totalContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center'
  },
  actions: {
    width: '100%',
    marginBottom: 20
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginBottom: 10,
    minWidth: '30%'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default AdminDetalhePedidoScreen;