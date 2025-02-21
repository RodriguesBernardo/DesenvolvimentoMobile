// screens/EditNewsScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { updateNews } from '../services/api';

const EditNewsScreen = ({ route, navigation }) => {
  const { news } = route.params;
  const [title, setTitle] = useState(news.title);
  const [summary, setSummary] = useState(news.summary);
  const [content, setContent] = useState(news.content);
  const [image, setImage] = useState(news.image);

  const handleSubmit = async () => {
    const updatedNews = { id: news.id, title, summary, content, image };
    await updateNews(news.id, updatedNews); // Atualiza a notícia na API
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Resumo"
        value={summary}
        onChangeText={setSummary}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Salvar Alterações" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditNewsScreen;