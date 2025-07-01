import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Button from '../../components/Button';
import { enviarOrcamento } from '../../services/orcamentoService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EnviarOrcamentoScreen = ({ navigation }) => {
  const [arquivo, setArquivo] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const selecionarArquivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: ['model/stl', 'application/octet-stream'],
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Enviar Orçamento</Text>
        <Text style={styles.subtitulo}>Selecione seu arquivo 3D para análise</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Arquivo do Modelo</Text>
        <Text style={styles.cardDescription}>Formatos aceitos: .stl, .3mf</Text>
        
        <Button 
          title="Selecionar Arquivo" 
          onPress={selecionarArquivo} 
          icon="upload"
          style={styles.botaoSelecionar}
        />
        
        {arquivo && (
          <View style={styles.arquivoContainer}>
            <Icon name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.arquivoNome} numberOfLines={1}>
              {arquivo.name}
            </Text>
          </View>
        )}
      </View>

      <Button 
        title={enviando ? "Enviando..." : "Enviar Orçamento"} 
        onPress={enviarArquivo} 
        disabled={!arquivo || enviando}
        icon={enviando ? null : "send"}
        style={[styles.botaoEnviar, (!arquivo || enviando) && styles.botaoDesabilitado]}
      />

      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={styles.voltarLink}
      >
        <Icon name="arrow-back" size={20} color="#3F51B5" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f5f5f5'
  },
  header: {
    marginBottom: 32,
    alignItems: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 8
  },
  subtitulo: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 8
  },
  cardDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 24
  },
  botaoSelecionar: {
    backgroundColor: '#2196F3',
    marginBottom: 16
  },
  arquivoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginTop: 8
  },
  arquivoNome: {
    marginLeft: 8,
    color: '#2E7D32',
    flex: 1
  },
  botaoEnviar: {
    backgroundColor: '#4CAF50',
    marginBottom: 24
  },
  botaoDesabilitado: {
    backgroundColor: '#BDBDBD'
  },
  voltarLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12
  },
  voltarTexto: {
    color: '#3F51B5',
    marginLeft: 8,
    fontWeight: '500'
  }
});

export default EnviarOrcamentoScreen;