import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Button from '../../components/Button';
import { enviarOrcamento } from '../../services/orcamentoService';

  const EnviarOrcamentoScreen = ({ navigation }) => {
    const [arquivo, setArquivo] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const selecionarArquivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: ['model/stl', 'application/octet-stream'], // Aceita STL e 3MF
        copyToCacheDirectory: true
      });
      
      if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
        const arquivoSelecionado = resultado.assets[0];
        setArquivo({
          uri: arquivoSelecionado.uri,
          name: arquivoSelecionado.name,
          mimeType: arquivoSelecionado.mimeType
        });
      }
    } catch (error) {
      Alert.alert('Erro', `Não foi possível selecionar o arquivo: ${error.message}`);
    }
  };

  const enviarArquivo = async () => {
    if (!arquivo) {
      Alert.alert('Aviso', 'Por favor, selecione um arquivo STL');
      return;
    }

    try {
      setEnviando(true);
      
      console.log('URI do arquivo:', arquivo.uri.substring(0, 50) + '...');
      console.log('Nome do arquivo:', arquivo.name);
      
      await enviarOrcamento(arquivo);
      
      Alert.alert('Sucesso', 'Orçamento enviado com sucesso');
      navigation.navigate('MeusOrcamentos');
    } catch (error) {
      console.error('Erro completo:', error);
      Alert.alert('Erro', error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Enviar Orçamento</Text>
      
      <Button 
        title="Selecionar Arquivo STL" 
        onPress={selecionarArquivo} 
        style={styles.botao}
      />
      
      {arquivo && (
        <View style={styles.arquivoContainer}>
          <Text style={styles.arquivoNome}>
            Arquivo selecionado: 
          </Text>
          <Text style={styles.arquivoNomeDestaque}>
            {arquivo.name}
          </Text>
        </View>
      )}
      
      <Button 
        title={enviando ? "Enviando..." : "Enviar para Orçamento"} 
        onPress={enviarArquivo} 
        disabled={!arquivo || enviando}
        style={[styles.botaoEnviar, (!arquivo || enviando) && styles.botaoDesabilitado]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },
  botao: {
    marginBottom: 20,
    backgroundColor: '#4CAF50',
  },
  botaoEnviar: {
    marginTop: 30,
    backgroundColor: '#2196F3',
  },
  botaoDesabilitado: {
    backgroundColor: '#cccccc',
  },
  arquivoContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    alignItems: 'center',
  },
  arquivoNome: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666'
  },
  arquivoNomeDestaque: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333'
  }
});

export default EnviarOrcamentoScreen;