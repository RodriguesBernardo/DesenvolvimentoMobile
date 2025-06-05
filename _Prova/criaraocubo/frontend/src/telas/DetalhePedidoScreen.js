import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { bootstrap } from '../estilos/bootstrapStyles';
import { useAuth } from '../contexto/AuthContext';
import api from '../servicos/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const statusCores = {
  'Recebido': '#17a2b8',
  'Em análise': '#ffc107',
  'Em produção': '#fd7e14',
  'Finalizado': '#28a745',
  'Entregue': '#6c757d',
  'Cancelado': '#dc3545'
};

const DetalhePedidoScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { usuario } = useAuth();
  const [pedido, setPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const carregarPedido = async () => {
    try {
      const response = await api.get(`/pedidos/${id}`);
      setPedido(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedido:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do pedido');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPedido();
  }, []);

  const baixarArquivo = async () => {
    try {
      const response = await api.get(`/pedidos/${id}/download`, {
        responseType: 'blob',
      });
      // Aqui você precisaria implementar a lógica para salvar o arquivo no dispositivo
      Alert.alert('Sucesso', 'Arquivo baixado com sucesso!');
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      Alert.alert('Erro', 'Não foi possível baixar o arquivo');
    }
  };

  if (carregando || !pedido) {
    return (
      <View style={[bootstrap.styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={bootstrap.styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Detalhes do Pedido</Text>
        <View style={{ 
          backgroundColor: statusCores[pedido.status],
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 15
        }}>
          <Text style={{ color: 'white' }}>{pedido.status}</Text>
        </View>
      </View>

      <View style={[bootstrap.styles.card, { marginBottom: 15 }]}>
        <View style={bootstrap.styles.cardBody}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Informações Básicas</Text>
          <Text>Projeto: {pedido.nomeProjeto}</Text>
          <Text>Material: {pedido.material}</Text>
          <Text>Cor: {pedido.cor}</Text>
          <Text>Data: {new Date(pedido.dataPedido).toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={[bootstrap.styles.card, { marginBottom: 15 }]}>
        <View style={bootstrap.styles.cardBody}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Dimensões</Text>
          <Text>Altura: {pedido.dimensoes.altura} mm</Text>
          <Text>Largura: {pedido.dimensoes.largura} mm</Text>
          <Text>Profundidade: {pedido.dimensoes.profundidade} mm</Text>
        </View>
      </View>

      {pedido.observacoes && (
        <View style={[bootstrap.styles.card, { marginBottom: 15 }]}>
          <View style={bootstrap.styles.cardBody}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Observações</Text>
            <Text>{pedido.observacoes}</Text>
          </View>
        </View>
      )}

      <View style={[bootstrap.styles.card, { marginBottom: 15 }]}>
        <View style={bootstrap.styles.cardBody}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Arquivo</Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={baixarArquivo}
          >
            <Icon name="insert-drive-file" size={24} color="#007bff" style={{ marginRight: 10 }} />
            <Text>{pedido.arquivo.nome}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {pedido.preco && (
        <View style={[bootstrap.styles.card, { marginBottom: 15 }]}>
          <View style={bootstrap.styles.cardBody}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Orçamento</Text>
            <Text>Preço estimado: R$ {pedido.preco.toFixed(2)}</Text>
            {pedido.tempoEstimado && (
              <Text>Tempo estimado: {Math.ceil(pedido.tempoEstimado)} horas</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default DetalhePedidoScreen;