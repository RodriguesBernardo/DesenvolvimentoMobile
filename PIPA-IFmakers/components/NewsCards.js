// components/NewsCards.js
import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewsCards = ({ news }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0); // Altura do conteúdo expandido
  const animationHeight = useRef(new Animated.Value(150)).current; // Altura inicial do card
  const arrowRotation = useRef(new Animated.Value(0)).current; // Rotação inicial do ícone
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacidade inicial do conteúdo

  // Função para alternar entre expandir e recolher o card
  const toggleExpand = () => {
    console.log('Card clicado. Estado expanded:', !expanded); // Verifique se o estado está mudando
    const initialHeight = expanded ? 150 : 150 + contentHeight; // Altura final (expanded: altura total, collapsed: 150)
    const finalHeight = expanded ? 150 + contentHeight : 150;

    const initialRotation = expanded ? 1 : 0; // Rotação final (expanded: 180°, collapsed: 0°)
    const finalRotation = expanded ? 0 : 1;

    const initialOpacity = expanded ? 1 : 0; // Opacidade final (expanded: 1, collapsed: 0)
    const finalOpacity = expanded ? 0 : 1;

    setExpanded(!expanded);

    // Animação da altura
    Animated.timing(animationHeight, {
      toValue: finalHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Animação da rotação do ícone
    Animated.timing(arrowRotation, {
      toValue: finalRotation,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animação da opacidade
    Animated.timing(fadeAnim, {
      toValue: finalOpacity,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Interpolação para a rotação do ícone
  const arrowInterpolate = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Mede a altura do conteúdo expandido
  const onContentLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    console.log('Altura do conteúdo expandido:', height); // Verifique a altura medida
    setContentHeight(height);
  };

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
      <Animated.View style={[styles.card, { height: animationHeight }]}>
        {/* Cabeçalho com título e ícone de seta */}
        <View style={styles.header}>
          <Text style={styles.title}>{news.title}</Text>
          <Animated.View style={{ transform: [{ rotate: arrowInterpolate }] }}>
            <Ionicons name="chevron-down" size={24} color="#6200ee" />
          </Animated.View>
        </View>

        {/* Imagem da notícia */}
        {news.image && (
          <Image source={{ uri: news.image }} style={styles.image} />
        )}

        {/* Resumo da notícia */}
        <Text style={styles.summary}>{news.summary}</Text>

        {/* Conteúdo expandido (aparece apenas quando expandido) */}
        {expanded && (
          <Animated.View onLayout={onContentLayout} style={[styles.contentContainer, { opacity: fadeAnim }]}>
            {/* Conteúdo completo da notícia */}
            <Text style={styles.content}>{news.content}</Text>

            {/* Informações adicionais (data e autor) */}
            <View style={styles.metaContainer}>
              {news.date && <Text style={styles.metaText}>Data: {news.date}</Text>}
              {news.author && <Text style={styles.metaText}>Autor: {news.author}</Text>}
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    overflow: 'hidden', // Garante que o conteúdo não ultrapasse os limites do card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 150, // Altura fixa para a imagem
    borderRadius: 10,
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  contentContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flex: 1, // Garante que o conteúdo ocupe o espaço disponível
  },
  content: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  metaContainer: {
    marginTop: 10,
  },
  metaText: {
    fontSize: 12,
    color: '#777',
  },
});

export default NewsCards;