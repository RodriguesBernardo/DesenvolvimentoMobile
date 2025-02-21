// screens/AboutScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AboutCard from '../components/AboutCard';

const delairImage = require('../assets/delair.png');
const gabiImage = require('../assets/Gabi.jpg')

const AboutScreen = () => {
  // Dados das pessoas (com links de imagens remotas)
  const people = [
    {
      id: '1',
      name: 'Delair Bavaresco',
      role: 'Coordenador',
      email: 'delair.bavaresco@ifrs.edu.com.br',
      image: delairImage, // Link da imagem remota
    },
    {
      id: '2',
      name: 'Diego Lieban',
      role: '',
      email: 'diego.lieban@ifrs.edu.com.br',
      image: 'https://exemplo.com/diego.jpg', // Link da imagem remota
    },
    {
      id: '3',
      name: 'Gabriele Batisti',
      role: 'Estagiária',
      email: 'gabriele.batisti@ifrs.edu.com',
      image: gabiImage, // Link da imagem remota
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {people.map((person) => (
        <AboutCard key={person.id} person={person} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default AboutScreen;