import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { globalStyles } from '../styles/global';

const ClassCard = ({ subject, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const cardHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 200], // Altura mínima e máxima do card
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Controla a opacidade do conteúdo expandido
  });

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <Animated.View style={[styles.card, { height: cardHeight }]}>
        {subject.image && (
          <Image source={{ uri: subject.image }} style={styles.backgroundImage} />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{subject.name}</Text>
          <Animated.View style={{ opacity }}>
            {expanded && (
              <>
                <Text style={globalStyles.text}>Horário: {subject.time}</Text>
                <Text style={globalStyles.text}>Sala: {subject.room}</Text>
                <Text style={globalStyles.text}>Professor: {subject.professor}</Text>
                <TouchableOpacity
                  style={[globalStyles.button, styles.deleteButton]}
                  onPress={onDelete}
                >
                  <Text style={globalStyles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3, // Ajuste a opacidade da imagem de fundo
  },
  content: {
    padding: 15,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginTop: 10,
  },
});

export default ClassCard;