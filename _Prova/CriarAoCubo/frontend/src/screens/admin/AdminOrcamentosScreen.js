import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  RefreshControl,
  ScrollView
} from 'react-native';
import { obterTodosOrcamentos, atualizarOrcamento } from '../../services/orcamentoService';
import CardOrcamento from '../../components/CardOrcamento';
import { Ionicons } from '@expo/vector-icons';

const AdminOrcamentosScreen = ({ navigation }) => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarOrcamentos = async () => {
    try {
      const dados = await obterTodosOrcamentos();
      setOrcamentos(dados);
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarOrcamentos();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarOrcamentos();
  };

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
      style={styles.cardContainer}
      activeOpacity={0.7}
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
      <View style={styles.carregandoContainer}>
        <ActivityIndicator size="large" color="#3F51B5" />
        <Text style={styles.carregandoTexto}>Carregando orçamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Gerenciar Orçamentos</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={onRefresh}
        >
          <Ionicons name="refresh" size={24} color="#3F51B5" />
        </TouchableOpacity>
      </View>
      
      {orcamentos.length === 0 ? (
        <ScrollView 
          contentContainerStyle={styles.emptyContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3F51B5']}
              tintColor="#3F51B5"
            />
          }
        >
          <Ionicons name="document-text-outline" size={80} color="#E0E0E0" />
          <Text style={styles.emptyTitle}>Nenhum orçamento encontrado</Text>
          <Text style={styles.emptySubtitle}>Quando novos orçamentos forem enviados, eles aparecerão aqui</Text>
        </ScrollView>
      ) : (
        <FlatList
          data={orcamentos}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.lista}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3F51B5']}
              tintColor="#3F51B5"
            />
          }
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginLeft: 8,
  },
  refreshButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lista: {
    padding: 16,
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  carregandoTexto: {
    marginTop: 16,
    color: '#757575',
    fontSize: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: '100%',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
    marginTop: 16,
    textAlign: 'center'
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default AdminOrcamentosScreen;