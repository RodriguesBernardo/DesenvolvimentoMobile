// screens/AddNewsScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddNewsScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');

  const { onAddNews } = route.params;

  const handleSubmit = async () => {
    const newNews = {
      id: Math.random().toString(), // Gera um ID único (substitua por um ID real no futuro)
      title,
      summary,
      content,
      image,
      date,
      author,
    };
    onAddNews(newNews); // Adiciona a nova notícia
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
      <TextInput
        style={styles.input}
        placeholder="Data (opcional)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor (opcional)"
        value={author}
        onChangeText={setAuthor}
      />
      <Button title="Adicionar Notícia" onPress={handleSubmit} />
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

export default AddNewsScreen;