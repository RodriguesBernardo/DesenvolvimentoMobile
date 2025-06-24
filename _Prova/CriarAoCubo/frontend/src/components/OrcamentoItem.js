import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OrcamentoItem = ({ orcamento }) => {
  const getStatusColor = () => {
    switch (orcamento.status) {
      case 'pendente': return '#FFA500';
      case 'em_analise': return '#1E90FF';
      case 'finalizado': return '#32CD32';
      default: return '#A9A9A9';
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nomeArquivo} numberOfLines={1}>
          {orcamento.nomeArquivo}
        </Text>
        <View style={[styles.status, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>
            {orcamento.status === 'pendente' && 'Pendente'}
            {orcamento.status === 'em_analise' && 'Em análise'}
            {orcamento.status === 'finalizado' && 'Finalizado'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.data}>Enviado em: {orcamento.dataEnvio}</Text>
      
      {orcamento.valor && (
        <Text style={styles.valor}>Valor: R$ {orcamento.valor.toFixed(2)}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nomeArquivo: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  data: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  valor: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
});

export default OrcamentoItem;