// screens/HelpDetailScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const HelpDetailScreen = ({ route }) => {
  const { item } = route.params; // Recebe o item de ajuda como parâmetro

  return (
    <ScrollView style={styles.container}>
      {/* Imagem de fundo */}
      {item.image && (
        <Image source={item.image} style={styles.backgroundImage} />
      )}

      {/* Overlay escuro para melhorar a legibilidade do texto */}
      <View style={styles.overlay} />

      {/* Conteúdo do item de ajuda */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.fullContent}>{item.content}</Text>
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
});

export default HelpDetailScreen;