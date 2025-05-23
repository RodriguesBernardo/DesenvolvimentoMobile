import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-picker/picker';
import { bootstrap } from '../estilos/bootstrapStyles';
import { useAuth } from '../contexto/AuthContext';
import api from '../servicos/api';

const PedidoFormScreen = ({ navigation }) => {
  const { usuario } = useAuth();
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [material, setMaterial] = useState('PLA');
  const [cor, setCor] = useState('');
  const [altura, setAltura] = useState('');
  const [largura, setLargura] = useState('');
  const [profundidade, setProfundidade] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const selecionarArquivo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setArquivo(res);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Erro', 'Erro ao selecionar arquivo');
      }
    }
  };

  const enviarPedido = async () => {
    if (!arquivo) {
      Alert.alert('Atenção', 'Por favor, selecione um arquivo');
      return;
    }

    setEnviando(true);
    
    try {
      const formData = new FormData();
      formData.append('nomeProjeto', nomeProjeto);
      formData.append('material', material);
      formData.append('cor', cor);
      formData.append('dimensoes', JSON.stringify({
        altura: parseFloat(altura),
        largura: parseFloat(largura),
        profundidade: parseFloat(profundidade)
      }));
      formData.append('observacoes', observacoes);
      formData.append('arquivo', {
        uri: arquivo.uri,
        name: arquivo.name,
        type: arquivo.type,
      });

      const response = await api.post('/pedidos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Sucesso', 'Pedido enviado com sucesso!');
      navigation.navigate('MeusPedidos');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao enviar pedido');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={bootstrap.styles.container}>
      <Text style={[bootstrap.styles.textCenter, { fontSize: 20, marginBottom: 20 }]}>
        Novo Pedido de Impressão
      </Text>
      
      <TextInput
        style={bootstrap.styles.formControl}
        placeholder="Nome do Projeto"
        value={nomeProjeto}
        onChangeText={setNomeProjeto}
      />
      
      <View style={[bootstrap.styles.formControl, { padding: 0 }]}>
        <Picker
          selectedValue={material}
          onValueChange={(itemValue) => setMaterial(itemValue)}>
          <Picker.Item label="PLA" value="PLA" />
          <Picker.Item label="PETG" value="PETG" />
          <Picker.Item label="ABS" value="ABS" />
          <Picker.Item label="TPU" value="TPU" />
          <Picker.Item label="Resina" value="Resina" />
        </Picker>
      </View>
      
      <TextInput
        style={bootstrap.styles.formControl}
        placeholder="Cor desejada"
        value={cor}
        onChangeText={setCor}
      />
      
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <TextInput
          style={[bootstrap.styles.formControl, { flex: 1, marginRight: 5 }]}
          placeholder="Altura (mm)"
          value={altura}
          onChangeText={setAltura}
          keyboardType="numeric"
        />
        <TextInput
          style={[bootstrap.styles.formControl, { flex: 1, marginHorizontal: 5 }]}
          placeholder="Largura (mm)"
          value={largura}
          onChangeText={setLargura}
          keyboardType="numeric"
        />
        <TextInput
          style={[bootstrap.styles.formControl, { flex: 1, marginLeft: 5 }]}
          placeholder="Prof. (mm)"
          value={profundidade}
          onChangeText={setProfundidade}
          keyboardType="numeric"
        />
      </View>
      
      <TextInput
        style={[bootstrap.styles.formControl, { height: 100 }]}
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />
      
      <TouchableOpacity 
        style={[bootstrap.styles.btnPrimary, { marginBottom: 15 }]}
        onPress={selecionarArquivo}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {arquivo ? `Arquivo: ${arquivo.name}` : 'Selecionar Arquivo (STL/ZIP)'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={bootstrap.styles.btnPrimary}
        onPress={enviarPedido}
        disabled={enviando}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {enviando ? 'Enviando...' : 'Enviar Pedido'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PedidoFormScreen;