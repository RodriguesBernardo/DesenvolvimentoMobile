import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { obterTodosOrcamentos, atualizarOrcamento } from '../../services/orcamentoService';
import CardOrcamento from '../../components/CardOrcamento';

const AdminOrcamentosScreen = ({ navigation }) => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarOrcamentos = async () => {
      try {
        const dados = await obterTodosOrcamentos();
        setOrcamentos(dados);
      } catch (error) {
        console.error('Erro ao carregar orçamentos:', error);
      } finally {
        setCarregando(false);
      }
    };
    
    carregarOrcamentos();
  }, []);

  const atualizarStatusOrcamento = async (id, novoStatus) => {
    try {
      await atualizarOrcamento(id, { status: novoStatus });
      const dados = await obterTodosOrcamentos();
      setOrcamentos(dados);
    } catch (error) {
      console.error('Erro ao atualizar orçamento:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('OrcamentoDetalhes', { orcamento: item })}
    >
      <CardOrcamento 
        orcamento={item} 
        isAdmin 
        onAtualizarStatus={atualizarStatusOrcamento}
      />
    </TouchableOpacity>
  );

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Todos os Orçamentos</Text>
      
      {orcamentos.length === 0 ? (
        <Text style={styles.semOrcamentos}>Nenhum orçamento encontrado</Text>
      ) : (
        <FlatList
          data={orcamentos}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  lista: {
    paddingBottom: 20
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  semOrcamentos: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666'
  }
});

export default AdminOrcamentosScreen;