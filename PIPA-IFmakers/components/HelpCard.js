// components/HelpCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const HelpCard = ({ title, content }) => {
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
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Text style={styles.arrow}>▼</Text>
          </Animated.View>
        </View>
        {expanded && (
          <View style={styles.contentContainer}>
            <Text style={styles.content}>{content}</Text>
          </View>
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
    overflow: 'hidden',
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#6200ee',
  },
  contentContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  content: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default HelpCard;