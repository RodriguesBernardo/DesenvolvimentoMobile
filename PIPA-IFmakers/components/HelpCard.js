import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const HelpCard = ({ title, content, image }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  // Animação de expansão do card
  const toggleExpand = () => {
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

  return (
    <TouchableOpacity
      onPress={toggleExpand} // Expande/recolhe o card ao clicar
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.card, { height: heightInterpolate }]}>
        <Image source={image} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {expanded && <Text style={styles.summary}>{content}</Text>}
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

export default HelpCard;