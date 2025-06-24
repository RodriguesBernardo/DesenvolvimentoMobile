import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import Button from '../../components/Button';
import { atualizarOrcamento } from '../../services/orcamentoService';

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Detalhes do Orçamento</Text>
      
      <View style={styles.detalhes}>
        <Text style={styles.label}>Arquivo:</Text>
        <Text style={styles.valor}>{orcamento.nomeArquivo}</Text>
        
        <Text style={styles.label}>Status:</Text>
        <View style={styles.statusContainer}>
          <TouchableOpacity 
            style={[styles.statusButton, status === 'pendente' && styles.statusActive]}
            onPress={() => setStatus('pendente')}
          >
            <Text>Pendente</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statusButton, status === 'em_analise' && styles.statusActive]}
            onPress={() => setStatus('em_analise')}
          >
            <Text>Em Análise</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statusButton, status === 'finalizado' && styles.statusActive]}
            onPress={() => setStatus('finalizado')}
          >
            <Text>Finalizado</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.label}>Valor (R$):</Text>
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
          placeholder="Digite o valor"
        />
        
        <Text style={styles.label}>Observações:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
          placeholder="Digite observações"
        />
        
        <Text style={styles.label}>Data de Envio:</Text>
        <Text style={styles.valor}>{formatarData(orcamento.dataEnvio)}</Text>
        
        <Text style={styles.label}>Data de Resposta:</Text>
        <Text style={styles.valor}>{formatarData(orcamento.dataResposta)}</Text>
      </View>
      
      <Button 
        title={carregando ? "Salvando..." : "Salvar Alterações"} 
        onPress={handleSalvar} 
        disabled={carregando}
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
    textAlign: 'center'
  },
  detalhes: {
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10
  },
  valor: {
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  statusButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '30%',
    alignItems: 'center'
  },
  statusActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3'
  },
  botao: {
    marginTop: 20
  }
});

export default OrcamentoDetalhesAdminScreen;