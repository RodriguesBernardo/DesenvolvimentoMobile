import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { obterMeusOrcamentos } from '../../services/orcamentoService';
import CardOrcamento from '../../components/CardOrcamento';
import { AuthContext } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  const recarregar = () => {
    setCarregando(true);
    setErro(null);
    useEffect(() => {}, []);
  };

  if (carregando) {
    return (
      <View style={styles.carregandoContainer}>
        <ActivityIndicator size="large" color="#3F51B5" />
        <Text style={styles.carregandoTexto}>Carregando orçamentos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Meus Orçamentos</Text>
        </View>
        
        <View style={styles.erroContainer}>
          <Icon name="error-outline" size={48} color="#F44336" style={styles.erroIcon} />
          <Text style={styles.erroTexto}>{erro}</Text>
          <TouchableOpacity
            style={styles.botaoRecarregar}
            onPress={recarregar}
          >
            <Icon name="refresh" size={20} color="#fff" style={styles.botaoIcon} />
            <Text style={styles.botaoTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Meus Orçamentos</Text>
      </View>
      
      {orcamentos.length === 0 ? (
        <View style={styles.semOrcamentosContainer}>
          <Icon name="assignment" size={64} color="#9E9E9E" style={styles.semOrcamentosIcon} />
          <Text style={styles.semOrcamentosTexto}>Você ainda não enviou nenhum orçamento</Text>
          <TouchableOpacity
            style={styles.botaoNovoOrcamento}
            onPress={() => navigation.navigate('EnviarOrcamento')}
          >
            <Icon name="add" size={20} color="#fff" style={styles.botaoIcon} />
            <Text style={styles.botaoTexto}>Enviar novo orçamento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orcamentos}
          renderItem={renderItem}
          keyExtractor={item => item._id || Math.random().toString()}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <View style={styles.semOrcamentosContainer}>
              <Text style={styles.semOrcamentosTexto}>Nenhum orçamento encontrado</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    padding: 16,
    elevation: 2
  },
  backButton: {
    marginRight: 16
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1
  },
  lista: {
    padding: 16
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  carregandoTexto: {
    marginTop: 16,
    color: '#757575'
  },
  semOrcamentosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  semOrcamentosIcon: {
    marginBottom: 16
  },
  semOrcamentosTexto: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 16,
    marginBottom: 24
  },
  erroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  erroIcon: {
    marginBottom: 16
  },
  erroTexto: {
    textAlign: 'center',
    color: '#F44336',
    fontSize: 16,
    marginBottom: 24
  },
  botaoRecarregar: {
    backgroundColor: '#3F51B5',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200
  },
  botaoNovoOrcamento: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200
  },
  botaoIcon: {
    marginRight: 8
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default MeusOrcamentosScreen;