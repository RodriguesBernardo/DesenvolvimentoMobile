import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { bootstrap } from '../estilos/bootstrapStyles';
import { useAuth } from '../contexto/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdminDashboardScreen = ({ navigation }) => {
  const { usuario, logout } = useAuth();

  const cards = [
    { 
      title: 'Pedidos', 
      icon: 'assignment', 
      count: 'Gerenciar', 
      action: () => navigation.navigate('AdminPedidos'),
      color: '#007bff'
    },
    { 
      title: 'Clientes', 
      icon: 'people', 
      count: 'Listar', 
      action: () => navigation.navigate('AdminUsuarios'),
      color: '#28a745'
    },
    { 
      title: 'Materiais', 
      icon: 'widgets', 
      count: 'Configurar', 
      action: () => navigation.navigate('AdminMateriais'),
      color: '#ffc107'
    }
  ];

  return (
    <ScrollView contentContainerStyle={bootstrap.styles.container}>
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Painel Administrativo
        </Text>
        <Text style={{ textAlign: 'center', marginTop: 5 }}>
          Bem-vindo, {usuario?.nome}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={card.action}
            style={[styles.card, { backgroundColor: card.color }]}
          >
            <Icon name={card.icon} size={40} color="white" style={{ marginBottom: 10 }} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardCount}>{card.count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[bootstrap.styles.btnPrimary, { marginTop: 30, backgroundColor: '#dc3545' }]}
        onPress={logout}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  card: {
    width: '48%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  cardCount: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  }
};

export default AdminDashboardScreen;