// components/HelpCard.js
import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const HelpCard = ({ title, content, image }) => {
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
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 400], // Altura inicial e final do card
  });

  // Função para detectar dois cliques
  const handleDoubleClick = () => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300; // Tempo máximo entre dois cliques (em milissegundos)

    if (now - lastPress.current < DOUBLE_PRESS_DELAY) {
      navigation.navigate('HelpDetail', { item: { title, content, image } }); // Navega para a tela de detalhes
    }

    lastPress.current = now;
  };

  // Função para detectar gesto de pinça
  const onPinchGestureEvent = ({ nativeEvent }) => {
    if (nativeEvent.scale > 1.5) { // Se o zoom for maior que 1.5x
      navigation.navigate('HelpDetail', { item: { title, content, image } }); // Navega para a tela de detalhes
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchGestureEvent}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END && nativeEvent.scale > 1.5) {
          navigation.navigate('HelpDetail', { item: { title, content, image } });
        }
      }}
    >
      <TouchableOpacity
        onPress={toggleExpand}
        onPressOut={handleDoubleClick} // Detecta dois cliques
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.card, { height: heightInterpolate }]}>
          {/* Imagem de fundo */}
          {image && <Image source={image} style={styles.backgroundImage} />}

          {/* Overlay escuro para melhorar a legibilidade do texto */}
          <View style={styles.overlay} />

          {/* Conteúdo do card */}
          <View style={styles.content}>
            {/* Título (sempre visível) */}
            <Text style={styles.title}>{title}</Text>

            {/* Conteúdo expandido (aparece apenas quando expandido) */}
            {expanded && (
              <View style={styles.expandedContent}>
                <Text style={styles.summary}>{content}</Text>
              </View>
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </PinchGestureHandler>
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
  expandedContent: {
    marginTop: 10,
  },
  summary: {
    fontSize: 14,
    color: '#eee',
  },
});

export default HelpCard;