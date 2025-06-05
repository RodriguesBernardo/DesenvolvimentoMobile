import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { bootstrap } from '../estilos/bootstrapStyles';
import { useAuth } from '../contexto/AuthContext';
import api from '../servicos/api';
import CardPedido from '../componentes/CardPedido';

const MeusPedidosScreen = ({ navigation }) => {
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const carregarPedidos = async () => {
    try {
      const response = await api.get('/pedidos/meus-pedidos');
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
      <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold' }}>
        Meus Pedidos
      </Text>

      {pedidos.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            Você ainda não fez nenhum pedido.
          </Text>
          <TouchableOpacity
            style={bootstrap.styles.btnPrimary}
            onPress={() => navigation.navigate('NovoPedido')}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Fazer Primeiro Pedido
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        pedidos.map((pedido) => (
          <CardPedido 
            key={pedido._id}
            pedido={pedido}
            onPress={() => navigation.navigate('DetalhePedido', { id: pedido._id })}
          />
        ))
      )}
    </ScrollView>
  );
};

export default MeusPedidosScreen;