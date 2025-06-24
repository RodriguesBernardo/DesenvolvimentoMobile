import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardOrcamento = ({ orcamento, isAdmin, onAtualizarStatus }) => {
  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      if (isNaN(data.getTime())) {
        return 'Data inválida';
      }
      
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const ano = data.getFullYear();
      const horas = data.getHours().toString().padStart(2, '0');
      const minutos = data.getMinutes().toString().padStart(2, '0');
      
      return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  const getStatusColor = () => {
    switch (orcamento.status) {
      case 'pendente': return '#ff9800';
      case 'em_analise': return '#2196f3';
      case 'finalizado': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const handleAtualizarStatus = (novoStatus) => {
    if (onAtualizarStatus) {
      onAtualizarStatus(orcamento._id, novoStatus);
    }
  };

  if (!orcamento) {
    return (
      <View style={styles.card}>
        <Text>Nenhum orçamento disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nomeArquivo} numberOfLines={1}>
          {orcamento.nomeArquivo || 'Arquivo sem nome'}
        </Text>
        <View style={[styles.status, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>
            {orcamento.status === 'pendente' && 'Pendente'}
            {orcamento.status === 'em_analise' && 'Em análise'}
            {orcamento.status === 'finalizado' && 'Finalizado'}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="person" size={16} color="#666" />
          <Text style={styles.infoText}>
            {orcamento.usuario?.nome || 'Usuário desconhecido'}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="calendar-today" size={16} color="#666" />
          <Text style={styles.infoText}>
            {formatarData(orcamento.dataEnvio)}
          </Text>
        </View>
        
        {orcamento.valor && (
          <View style={styles.infoRow}>
            <Icon name="attach-money" size={16} color="#2e7d32" />
            <Text style={[styles.infoText, styles.valorText]}>
              R$ {Number(orcamento.valor).toFixed(2)}
            </Text>
          </View>
        )}
      </View>
      
      {isAdmin && (
        <View style={styles.acoes}>
          {orcamento.status !== 'em_analise' && (
            <TouchableOpacity 
              style={styles.botaoAcao}
              onPress={() => handleAtualizarStatus('em_analise')}
            >
              <Icon name="hourglass-empty" size={20} color="#2196f3" />
              <Text style={styles.textoAcao}>Em análise</Text>
            </TouchableOpacity>
          )}
          
          {orcamento.status !== 'finalizado' && (
            <TouchableOpacity 
              style={styles.botaoAcao}
              onPress={() => handleAtualizarStatus('finalizado')}
            >
              <Icon name="check" size={20} color="#4caf50" />
              <Text style={styles.textoAcao}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
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
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  nomeArquivo: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    color: '#333'
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start'
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  infoContainer: {
    marginVertical: 5
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  infoText: {
    color: '#666',
    marginLeft: 5,
    fontSize: 14
  },
  valorText: {
    color: '#2e7d32',
    fontWeight: 'bold'
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  botaoAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    padding: 5
  },
  textoAcao: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14
  }
});

export default CardOrcamento;