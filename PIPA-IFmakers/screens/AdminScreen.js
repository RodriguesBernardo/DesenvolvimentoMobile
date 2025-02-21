// screens/AdminScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addNews, updateNews, deleteNews } from '../services/api';

const AdminScreen = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleAddNews = async () => {
    const newNews = { title, summary, content, image };
    await addNews(newNews);
    // Limpar os campos após adicionar
    setTitle('');
    setSummary('');
    setContent('');
    setImage('');
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
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Adicionar Notícia" onPress={handleAddNews} />
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

export default AdminScreen;