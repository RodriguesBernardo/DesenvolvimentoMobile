import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Button from '../../components/Button';
import { atualizarOrcamento } from '../../services/orcamentoService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrcamentoDetalhesAdminScreen = ({ route, navigation }) => {
  const { orcamento: initialOrcamento } = route.params;
  const [orcamento, setOrcamento] = useState(initialOrcamento);
  const [valor, setValor] = useState(initialOrcamento.valor ? initialOrcamento.valor.toString() : '');
  const [observacoes, setObservacoes] = useState(initialOrcamento.observacoes || '');
  const [status, setStatus] = useState(initialOrcamento.status);
  const [carregando, setCarregando] = useState(false);

  const handleSalvar = async () => {
    try {
      setCarregando(true);
      const dadosAtualizados = {
        valor: parseFloat(valor) || null,
        observacoes,
        status
      };
      
      const orcamentoAtualizado = await atualizarOrcamento(orcamento._id, dadosAtualizados);
      setOrcamento(orcamentoAtualizado);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar orçamento:', error);
    } finally {
      setCarregando(false);
    }
  };

  const formatarData = (data) => {
    if (!data) return '---';
    const date = new Date(data);
    return date.toLocaleString('pt-BR');
  };

  const getStatusColor = () => {
    switch(status) {
      case 'pendente': return '#FFA726';
      case 'em_analise': return '#42A5F5';
      case 'finalizado': return '#66BB6A';
      default: return '#9E9E9E';
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Detalhes do Orçamento</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="attach-file" size={24} color="#3F51B5" />
            <Text style={styles.cardTitle}>Arquivo</Text>
          </View>
          <Text style={styles.cardValue}>{orcamento.nomeArquivo}</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="info" size={24} color="#3F51B5" />
            <Text style={styles.cardTitle}>Status</Text>
          </View>
          <View style={styles.statusContainer}>
            <TouchableOpacity 
              style={[styles.statusButton, status === 'pendente' && styles.statusActive('pendente')]}
              onPress={() => setStatus('pendente')}
            >
              <Text style={status === 'pendente' ? styles.statusTextActive : styles.statusText}>Pendente</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.statusButton, status === 'em_analise' && styles.statusActive('em_analise')]}
              onPress={() => setStatus('em_analise')}
            >
              <Text style={status === 'em_analise' ? styles.statusTextActive : styles.statusText}>Em Análise</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.statusButton, status === 'finalizado' && styles.statusActive('finalizado')]}
              onPress={() => setStatus('finalizado')}
            >
              <Text style={status === 'finalizado' ? styles.statusTextActive : styles.statusText}>Finalizado</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statusIndicatorContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={styles.statusTextIndicator}>{status.replace('_', ' ').toUpperCase()}</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="monetization-on" size={24} color="#3F51B5" />
            <Text style={styles.cardTitle}>Valor (R$)</Text>
          </View>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            placeholder="Digite o valor"
            placeholderTextColor="#9E9E9E"
          />
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="notes" size={24} color="#3F51B5" />
            <Text style={styles.cardTitle}>Observações</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
            placeholder="Digite observações..."
            placeholderTextColor="#9E9E9E"
          />
        </View>
        
        <View style={styles.datesContainer}>
          <View style={styles.dateCard}>
            <Icon name="schedule" size={20} color="#757575" />
            <Text style={styles.dateLabel}>Enviado em:</Text>
            <Text style={styles.dateValue}>{formatarData(orcamento.dataEnvio)}</Text>
          </View>
          
          <View style={styles.dateCard}>
            <Icon name="update" size={20} color="#757575" />
            <Text style={styles.dateLabel}>Resposta em:</Text>
            <Text style={styles.dateValue}>{formatarData(orcamento.dataResposta)}</Text>
          </View>
        </View>
        
        <Button 
          title={carregando ? "Salvando..." : "Salvar Alterações"} 
          onPress={handleSalvar} 
          disabled={carregando}
          style={styles.botao}
          icon={carregando ? null : "save"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#3F51B5'
  },
  cardValue: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#424242',
    backgroundColor: '#FAFAFA'
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  statusButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusActive: (status) => ({
    backgroundColor: 
      status === 'pendente' ? '#FFF3E0' : 
      status === 'em_analise' ? '#E3F2FD' : '#E8F5E9',
    borderColor: 
      status === 'pendente' ? '#FFA726' : 
      status === 'em_analise' ? '#42A5F5' : '#66BB6A'
  }),
  statusText: {
    color: '#757575'
  },
  statusTextActive: {
    fontWeight: 'bold',
    color: '#212121'
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8
  },
  statusTextIndicator: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#757575',
    textTransform: 'uppercase'
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  dateCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    elevation: 1
  },
  dateLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4
  },
  dateValue: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500'
  },
  botao: {
    marginTop: 8,
    backgroundColor: '#3F51B5'
  }
});

export default OrcamentoDetalhesAdminScreen;