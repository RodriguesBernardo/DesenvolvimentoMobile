// components/AboutCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutCard = ({ person }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

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
    outputRange: [100, 250], // Altura inicial e final do card
  });

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Rotação do ícone de seta
  });

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
      <Animated.View style={[styles.card, { height: heightInterpolate }]}>
        {/* Imagem de fundo */}
        {person.image && <Image source={person.image} style={styles.backgroundImage} />}

        {/* Overlay escuro para melhorar a legibilidade */}
        <View style={styles.overlay} />

        {/* Conteúdo do card */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.name}>{person.name}</Text>
              <Text style={styles.role}>{person.role}</Text>
            </View>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <Ionicons name="chevron-down" size={24} color="#fff" />
            </Animated.View>
          </View>

          {/* Conteúdo expandido */}
          {expanded && (
            <View style={styles.contactContainer}>
              {person.email && <Text style={styles.contactText}>Email: {person.email}</Text>}
              {person.phone && <Text style={styles.contactText}>Telefone: {person.phone}</Text>}
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  role: {
    fontSize: 14,
    color: '#eee',
  },
  contactContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
});

export default AboutCard;