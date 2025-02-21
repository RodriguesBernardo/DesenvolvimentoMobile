import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewsCards = ({ news }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const lastPress = useRef(0); // Para detectar dois cliques

  // Animação de expansão do card
  const toggleExpand = () => {
    const initialValue = expanded ? 1 : 0;
    const finalValue = expanded ? 0 : 1;

    setExpanded(!expanded);

    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false, // Desabilita o native driver para animações de altura
    }).start();
  };

  // Interpolação para a altura do card
  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 400], // Altura inicial e final do card
  });

  // Função para detectar dois cliques
  const handleDoubleClick = () => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300; // Tempo máximo entre dois cliques (em milissegundos)

    if (now - lastPress.current < DOUBLE_PRESS_DELAY) {
      // Navega para a tela de detalhes com animação
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        navigation.navigate('NewsDetail', { news });
      });
    }

    lastPress.current = now;
  };

  return (
    <TouchableOpacity
      onPress={toggleExpand}
      onPressOut={handleDoubleClick} // Detecta dois cliques
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.card, { height: heightInterpolate }]}>
        {/* Imagem de fundo */}
        {news.image && (
          <Image source={{ uri: news.image }} style={styles.backgroundImage} />
        )}

        {/* Overlay escuro para melhorar a legibilidade do texto */}
        <View style={styles.overlay} />

        {/* Conteúdo do card */}
        <View style={styles.content}>
          <Text style={styles.title}>{news.title}</Text>
          {expanded && (
            <Text style={styles.summary}>{news.summary}</Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    padding: 15,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  summary: {
    fontSize: 14,
    color: '#eee',
    marginTop: 10,
  },
});

export default NewsCards;