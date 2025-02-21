// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import NewsCards from '../components/NewsCards'; // Import corrigido para NewsCards
import { fetchNews, deleteNews } from '../services/api';

const HomeScreen = ({ navigation, route }) => {
  const [news, setNews] = useState([]);
  const isAdmin = route.params?.isAdmin || false; // Verifica se o admin está logado

  // Carrega as notícias ao abrir a tela
  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews();
      setNews(data);
    };
    loadNews();
  }, []);

  // Função para remover uma notícia
  const handleDeleteNews = async (id) => {
    await deleteNews(id);
    setNews(news.filter((item) => item.id !== id)); // Atualiza o estado local
  };

  // Função para adicionar uma nova notícia ao estado
  const handleAddNews = (newNews) => {
    setNews([newNews, ...news]); // Adiciona a nova notícia no início da lista
  };

  return (
    <View style={styles.container}>
      {isAdmin && ( // Só mostra o botão se o admin estiver logado
        <Button
          title="Adicionar Notícia"
          onPress={() => navigation.navigate('AddNews', { onAddNews: handleAddNews })}
        />
      )}
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NewsCards news={item} /> 
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;