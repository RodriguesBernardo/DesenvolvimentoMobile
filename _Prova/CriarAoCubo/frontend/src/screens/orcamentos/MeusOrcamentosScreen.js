import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { obterMeusOrcamentos } from '../../services/orcamentoService';
import CardOrcamento from '../../components/CardOrcamento';
import { AuthContext } from '../../context/AuthContext';

const MeusOrcamentosScreen = ({ navigation }) => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    const carregarOrcamentos = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const dados = await obterMeusOrcamentos();
        
        // Verifica se os dados são válidos antes de atualizar o estado
        if (Array.isArray(dados)) {
          setOrcamentos(dados);
        } else {
          console.warn('Dados recebidos não são um array:', dados);
          setOrcamentos([]);
        }
      } catch (error) {
        console.error('Erro ao carregar orçamentos:', error);
        setErro('Não foi possível carregar os orçamentos. Tente novamente mais tarde.');
      } finally {
        setCarregando(false);
      }
    };
    
    carregarOrcamentos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('OrcamentoDetalhes', { orcamento: item })}
      activeOpacity={0.7}
    >
      <CardOrcamento orcamento={item} />
    </TouchableOpacity>
  );

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>{erro}</Text>
        <TouchableOpacity
          style={styles.botaoRecarregar}
          onPress={() => {
            setCarregando(true);
            setErro(null);
            useEffect(() => {}, []); // Dispara o efeito novamente
          }}
        >
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Orçamentos</Text>
      
      {orcamentos.length === 0 ? (
        <View style={styles.semOrcamentosContainer}>
          <Text style={styles.semOrcamentos}>Você ainda não enviou nenhum orçamento</Text>
          <TouchableOpacity
            style={styles.botaoNovoOrcamento}
            onPress={() => navigation.navigate('EnviarOrcamento')}
          >
            <Text style={styles.textoBotao}>Enviar novo orçamento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orcamentos}
          renderItem={renderItem}
          keyExtractor={item => item._id || Math.random().toString()}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.semOrcamentos}>Nenhum orçamento encontrado</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
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
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  semOrcamentosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  semOrcamentos: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16
  },
  erro: {
    textAlign: 'center',
    color: '#ff0000',
    marginBottom: 20,
    fontSize: 16
  },
  botaoRecarregar: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center'
  },
  botaoNovoOrcamento: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default MeusOrcamentosScreen;