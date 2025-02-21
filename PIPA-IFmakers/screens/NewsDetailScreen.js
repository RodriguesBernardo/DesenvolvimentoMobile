// screens/NewsDetailScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const NewsDetailScreen = ({ route }) => {
  const { news } = route.params; // Recebe a notícia como parâmetro

  return (
    <ScrollView style={styles.container}>
      {/* Imagem de fundo */}
      {news.image && (
        <Image source={{ uri: news.image }} style={styles.backgroundImage} />
      )}

      {/* Overlay escuro para melhorar a legibilidade do texto */}
      <View style={styles.overlay} />

      {/* Conteúdo da notícia */}
      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.fullContent}>{news.content}</Text>

        {/* Informações adicionais (data e autor) */}
        <View style={styles.metaContainer}>
          {news.date && <Text style={styles.metaText}>Data: {news.date}</Text>}
          {news.author && <Text style={styles.metaText}>Autor: {news.author}</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: 300, // Altura fixa para a imagem de fundo
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    padding: 16,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  fullContent: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  metaContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default NewsDetailScreen;