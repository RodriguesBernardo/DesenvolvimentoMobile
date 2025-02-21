// screens/NewsDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { deleteNews } from '../services/api';

const NewsDetailScreen = ({ route, navigation }) => {
  const { news, isAdmin } = route.params; // Recebe a notícia e o estado isAdmin

  // Função para deletar a notícia
  const handleDelete = async () => {
    try {
      await deleteNews(news.id); // Remove a notícia da API
      navigation.goBack(); // Volta para a tela anterior
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a notícia.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: news.image }} style={styles.image} />
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.content}>{news.content}</Text>

      {isAdmin && ( // Só mostra os botões se o admin estiver logado
        <View style={styles.adminOptions}>
          <Button
            title="Editar"
            onPress={() => navigation.navigate('EditNews', { news })}
          />
          <Button title="Remover" onPress={handleDelete} color="red" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
  adminOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default NewsDetailScreen;