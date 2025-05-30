import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { bootstrap } from '../estilos/bootstrapStyles';
import { useAuth } from '../contexto/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { usuario } = useAuth();

  return (
    <ScrollView contentContainerStyle={bootstrap.styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Image 
          // source={require('../assets/logo.png')} 
          style={{ width: 150, height: 150, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Bem-vindo à Criar³ Impressão 3D
        </Text>
        {usuario && (
          <Text style={{ marginTop: 10, textAlign: 'center' }}>
            Olá, {usuario.nome}!
          </Text>
        )}
      </View>

      <View style={[bootstrap.styles.card, { marginBottom: 20 }]}>
        <View style={bootstrap.styles.cardBody}>
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            Transforme suas ideias em realidade com nossa impressão 3D de alta qualidade.
          </Text>
          <TouchableOpacity
            style={bootstrap.styles.btnPrimary}
            onPress={() => navigation.navigate('NovoPedido')}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Solicitar Novo Pedido
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={bootstrap.styles.card}>
        <View style={bootstrap.styles.cardBody}>
          <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>
            Nossos Materiais
          </Text>
          <Text style={{ marginBottom: 15 }}>
            Trabalhamos com PLA, PETG, ABS, TPU e Resina, oferecendo diversas cores e acabamentos.
          </Text>
          <TouchableOpacity
            style={[bootstrap.styles.btnPrimary, { backgroundColor: '#6c757d' }]}
            onPress={() => navigation.navigate('Contato')}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Saiba Mais
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity
          style={[bootstrap.styles.btnPrimary, { flex: 1, marginRight: 10, backgroundColor: '#6c757d' }]}
          onPress={() => navigation.navigate('MeusPedidos')}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Meus Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[bootstrap.styles.btnPrimary, { flex: 1, marginLeft: 10, backgroundColor: '#6c757d' }]}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Meu Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;