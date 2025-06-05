import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { bootstrap } from '../estilos/bootstrapStyles';
import api from '../servicos/api';
import CardPedido from '../componentes/CardPedido';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdminPedidosScreen = ({ navigation }) => {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const carregarPedidos = async () => {
    try {
      const response = await api.get('/admin/pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarPedidos);
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setAtualizando(true);
    carregarPedidos();
  };

  if (carregando) {
    return (
      <View style={[bootstrap.styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={bootstrap.styles.container}
      refreshControl={
        <RefreshControl refreshing={atualizando} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Todos os Pedidos</Text>
        <TouchableOpacity onPress={() => setAtualizando(true)}>
          <Icon name="refresh" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {pedidos.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 16 }}>Nenhum pedido encontrado.</Text>
        </View>
      ) : (
        pedidos.map((pedido) => (
          <TouchableOpacity 
            key={pedido._id}
            onPress={() => navigation.navigate('AdminDetalhePedido', { id: pedido._id })}
          >
            <CardPedido pedido={pedido} />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default AdminPedidosScreen;