import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import AboutCard from '../components/AboutCard';

const delairImage = require('../assets/delair.png');
const gabiImage = require('../assets/Gabi.jpg');
const pipaImage = 'https://ifrs.edu.br/bento/wp-content/uploads/sites/13/2021/09/capa-pipa-1.png';

const AboutScreen = () => {
  // Dados sobre o PIPA
  const pipaInfo = {
    id: '0',
    name: 'Sobre o PIPA',
    description:
      'O PIPA (Projeto Integrado de Pesquisa em Automação) é uma iniciativa do IFRS que visa promover a inovação e o desenvolvimento de soluções tecnológicas na área de automação industrial.',
    image: pipaImage, // Imagem do PIPA
  };

  // Dados dos colaboradores
  const people = [
    {
      id: '1',
      name: 'Delair Bavaresco',
      role: 'Coordenador',
      email: 'delair.bavaresco@ifrs.edu.com.br',
      image: delairImage,
    },
    {
      id: '2',
      name: 'Diego Lieban',
      role: '',
      email: 'diego.lieban@ifrs.edu.com.br',
      image: 'https://exemplo.com/diego.jpg',
    },
    {
      id: '3',
      name: 'Gabriele Batisti',
      role: 'Estagiária',
      email: 'gabriele.batisti@ifrs.edu.com',
      image: gabiImage,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Card sobre o PIPA */}
      <AboutCard person={pipaInfo} />

      {/* Seção dos colaboradores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colaboradores</Text>
        {people.map((person) => (
          <AboutCard key={person.id} person={person} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default AboutScreen;