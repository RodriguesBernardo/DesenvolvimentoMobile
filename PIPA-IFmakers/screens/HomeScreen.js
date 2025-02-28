import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const cards = [
    {
      id: '1',
      titulo: 'Dicas Rápidas',
      descricao: 'Acesse dicas úteis para o uso dos equipamentos do PIPA.',
      icone: 'bulb-outline',
      tela: 'Help',
    },
    {
      id: '2',
      titulo: 'Contato',
      descricao: 'Tem alguma dúvida? Mande um Email!',
      icone: 'chatbox-ellipses-outline',
      tela: 'Contatos',
    },
    {
      id: '3',
      titulo: 'Recursos Úteis',
      descricao: 'Manuais, tutoriais e links importantes.',
      icone: 'document-text-outline',
      tela: 'Recursos',
    },
    {
      id: '4',
      titulo: 'Sobre o PIPA',
      descricao: 'Conheça mais sobre o projeto PIPA e seus colaboradores.',
      icone: 'information-circle-outline',
      tela: 'About',
    },
    {
      id: '5',
      titulo: 'Visitas',
      descricao: 'Historicos de visitas estudantis.',
      icone: 'camera-outline',
      tela: 'Visitas'
    },

  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao aplicativo do PIPA IFMakerRS</Text>
      <Text style={styles.subtitulo}>Selecione uma opção:</Text>

      {cards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={styles.card}
          onPress={() => navigation.navigate(card.tela)}
        >
          <View style={styles.cardContent}>
            <Ionicons name={card.icone} size={32} color="#333" />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitulo}>{card.titulo}</Text>
              <Text style={styles.cardDescricao}>{card.descricao}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescricao: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default HomeScreen;