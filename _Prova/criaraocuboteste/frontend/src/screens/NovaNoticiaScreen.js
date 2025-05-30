import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function NovaNoticiaScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  const publicarNoticia = async () => {
    if (!titulo || !conteudo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://<SEU_IP>:3000/api/noticias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, conteudo }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Notícia publicada com sucesso!');
        setTitulo('');
        setConteudo('');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao publicar a notícia.');
      }
    } catch (err) {
      console.error('Erro ao publicar notícia:', err);
      Alert.alert('Erro', 'Erro de conexão.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nova Notícia</Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <TextInput
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
        numberOfLines={5}
        style={[styles.input, { height: 120 }]}
      />

      <Button title="Publicar Notícia" onPress={publicarNoticia} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
});
