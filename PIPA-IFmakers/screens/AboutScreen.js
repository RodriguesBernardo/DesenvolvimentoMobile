import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import AboutCard from '../components/AboutCard';

const pipaImage = require('../assets/pipa.png');
const delairImage = require('../assets/colaboradores/delair.png');
const diegoImage = require('../assets/pipa.png');
const isadoraImage = require('../assets/pipa.png');
const leonardoImage = require('../assets/pipa.png');
const lucianaImage = require('../assets/pipa.png');
const tiagoImage = require('../assets/pipa.png');
const ronaldoImage = require('../assets/pipa.png');
const shanaImage = require('../assets/pipa.png');
const thiagoImage = require('../assets/pipa.png');
const gabrieleImage = require('../assets/colaboradores/Gabi.jpg')

const AboutScreen = () => {
  const people = [
    { id: '1', name: 'Gabriele Batisti', role: 'Estágiaria', email:'gabriele.batisti@ifrs.edu.br', image:gabrieleImage},
    { id: '2', name: 'Delair Bavaresco', role: 'Matemática', email: 'delair.bavaresco@ifrs.edu.br', image: delairImage },
    { id: '3', name: 'Diego Lieban', role: 'Matemática', email: 'diego.lieban@ifrs.edu.br', image: diegoImage },
    { id: '4', name: 'Isadora Malicheski', role: 'Arquitetura', email: 'isadora.malicheski@ifrs.edu.br', image: isadoraImage },
    { id: '5', name: 'Leonardo Cury', role: 'Viticultura', email: 'leonardo.cury@ifrs.edu.br', image: leonardoImage },
    { id: '6', name: 'Luciana Bernd', role: 'Ciência de Alimentos', email: 'luciana.bernd@ifrs.edu.br', image: lucianaImage },
    { id: '7', name: 'Tiago Nascimento', role: 'Física', email: 'tiago.nascimento@ifrs.edu.br', image: tiagoImage },
    { id: '8', name: 'Ronaldo Serpa', role: 'Computação', email: 'ronaldo.serpa@ifrs.edu.br', image: ronaldoImage },
    { id: '9', name: 'Shana Flores', role: 'Geografia', email: 'shana.flores@ifrs.edu.br', image: shanaImage },
    { id: '10', name: 'Thiago Reis', role: 'Administração', email: 'thiago.reis@ifrs.edu.br', image: thiagoImage },
  ];

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true} // Alterado para true para depuração
    >
      <View style={styles.card}>
        <Image source={pipaImage} style={styles.image} />
        <Text style={styles.titulo}>Sobre o PIPA</Text>
        <Text style={styles.descricao}>
          O PIPA IFmakeRS surge de uma articulação de diversas iniciativas no IFRS, campus Bento Gonçalves, como uma proposta interdisciplinar que articula ações de ensino, pesquisa e extensão, utilizando a cultura maker como fio condutor.
        </Text>
        <Text style={styles.descricao}>
          O nome “PIPA” faz referência à cultura local, simbolizando o barril de vinho, um dos principais produtos da região. Ao mesmo tempo, é um acrônimo para os pilares do projeto: Pesquisar, Inovar, Prototipar e Aprender.
        </Text>
        <Text style={styles.descricao}>
          O projeto está localizado no Bloco de Convivência Acadêmica e conta com um laboratório equipado para atividades de prototipagem e inovação, incentivando o aprendizado criativo.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipe</Text>
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
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 10,
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