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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Detalhes do Orçamento</Text>
      
      <View style={styles.detalhes}>
        <Text style={styles.label}>Arquivo:</Text>
        <Text style={styles.valor}>{orcamento.nomeArquivo}</Text>
        
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.valor}>
          {orcamento.status === 'pendente' && 'Pendente'}
          {orcamento.status === 'em_analise' && 'Em análise'}
          {orcamento.status === 'finalizado' && 'Finalizado'}
        </Text>
        
        {orcamento.valor && (
          <>
            <Text style={styles.label}>Valor:</Text>
            <Text style={styles.valor}>
              R$ {orcamento.valor.toFixed(2)}
            </Text>
          </>
        )}
        
        {orcamento.observacoes && (
          <>
            <Text style={styles.label}>Observações:</Text>
            <Text style={styles.valor}>{orcamento.observacoes}</Text>
          </>
        )}
        
        <Text style={styles.label}>Data de Envio:</Text>
        <Text style={styles.valor}>{formatarData(orcamento.dataEnvio)}</Text>
        
        {orcamento.dataResposta && (
          <>
            <Text style={styles.label}>Data de Resposta:</Text>
            <Text style={styles.valor}>{formatarData(orcamento.dataResposta)}</Text>
          </>
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
    padding: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  detalhes: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333'
  },
  valor: {
    marginBottom: 10,
    color: '#666'
  },
  botao: {
    marginTop: 20
  }
});

export default OrcamentoDetalhesScreen;