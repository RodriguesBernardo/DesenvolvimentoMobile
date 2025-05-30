import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function PedidoFormScreen() {
  const [descricao, setDescricao] = useState('');
  const [arquivo, setArquivo] = useState(null);

  const selecionarArquivo = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.assets && result.assets.length > 0) {
      setArquivo(result.assets[0]);
    }
  };

  const enviarPedido = () => {
    if (!descricao || !arquivo) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    // Aqui você chamaria a API usando fetch ou axios
    console.log('Enviando:', { descricao, arquivo });
    Alert.alert('Pedido enviado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Pedido de Impressão 3D</Text>

      <TextInput
        placeholder="Descrição do projeto"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <Button title="Selecionar Arquivo 3D" onPress={selecionarArquivo} />
      {arquivo && <Text style={{ marginTop: 10 }}>{arquivo.name}</Text>}

      <View style={{ marginTop: 20 }}>
        <Button title="Enviar Pedido" onPress={enviarPedido} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
