import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { baixarArquivo } from '../../services/orcamentoService';

const OrcamentoDetalhesScreen = ({ route }) => {
  const { orcamento } = route.params;

  const handleBaixarArquivo = async () => {
    try {
      await baixarArquivo(orcamento._id, orcamento.nomeArquivo);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
    }
  };

  const formatarData = (data) => {
    if (!data) return '---';
    
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const getStatusColor = () => {
    switch(orcamento.status) {
      case 'pendente': return '#FFA726';
      case 'em_analise': return '#42A5F5';
      case 'finalizado': return '#66BB6A';
      default: return '#9E9E9E';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Detalhes do Orçamento</Text>
      
      <View style={styles.detalhes}>
        <View style={styles.item}>
          <Text style={styles.label}>Arquivo:</Text>
          <Text style={styles.valor}>{orcamento.nomeArquivo}</Text>
        </View>
        
        <View style={styles.item}>
          <Text style={styles.label}>Status:</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={styles.valor}>
              {orcamento.status === 'pendente' && 'Pendente'}
              {orcamento.status === 'em_analise' && 'Em análise'}
              {orcamento.status === 'finalizado' && 'Finalizado'}
            </Text>
          </View>
        </View>
        
        {orcamento.valor && (
          <View style={styles.item}>
            <Text style={styles.label}>Valor:</Text>
            <Text style={styles.valor}>
              R$ {orcamento.valor.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        )}
        
        {orcamento.observacoes && (
          <View style={styles.item}>
            <Text style={styles.label}>Observações:</Text>
            <Text style={styles.valor}>{orcamento.observacoes}</Text>
          </View>
        )}
        
        <View style={styles.item}>
          <Text style={styles.label}>Data de Envio:</Text>
          <Text style={styles.valor}>{formatarData(orcamento.dataEnvio)}</Text>
        </View>
        
        {orcamento.dataResposta && (
          <View style={styles.item}>
            <Text style={styles.label}>Data de Resposta:</Text>
            <Text style={styles.valor}>{formatarData(orcamento.dataResposta)}</Text>
          </View>
        )}
      </View>
      
      <Button 
        title="Baixar Arquivo STL" 
        onPress={handleBaixarArquivo} 
        style={styles.botao}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3F51B5'
  },
  detalhes: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2
  },
  item: {
    marginBottom: 12
  },
  label: {
    fontWeight: 'bold',
    color: '#3F51B5',
    fontSize: 14,
    marginBottom: 4
  },
  valor: {
    color: '#424242',
    fontSize: 16
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8
  },
  botao: {
    marginTop: 8,
    backgroundColor: '#3F51B5'
  }
});

export default OrcamentoDetalhesScreen;