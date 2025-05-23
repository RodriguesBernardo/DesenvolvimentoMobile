import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecursosScreen = () => {
  // Dados dos recursos (pode ser estático ou carregado de um arquivo local)
  const recursos = [
    {
      id: '1',
      tipo: 'manual',
      titulo: 'Manual da Cortadora a Laser',
      descricao: 'Guia completo de operação da cortadora a laser.',
      link: 'https://www.canva.com/design/DAEbqoC8xGE/BFjUWe4uiykT4bQ0LBZrxw/view?utm_content=DAEbqoC8xGE&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton ',
    },
    {
      id: '2',
      tipo: 'tutorial',
      titulo: 'Como usar a Fresadora CNC',
      descricao: 'Passo a passo para operar a fresadora CNC.',
      link: 'https://exemplo.com/tutorial-fresadora-cnc',
    },
    {
      id: '3',
      tipo: 'link',
      titulo: 'Site do IFRS',
      descricao: 'Acesse o site oficial do IFRS para mais informações.',
      link: 'https://ifrs.edu.br',
    },
    {
      id: '4',
      tipo: 'video',
      titulo: 'Vídeo: Segurança no Laboratório',
      descricao: 'Assista ao vídeo sobre normas de segurança.',
      link: 'https://youtube.com/exemplo-seguranca',
    },
  ];

  // Função para abrir links
  const abrirLink = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error('Erro ao abrir o link:', err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Recursos Úteis</Text>
      {recursos.map((recurso) => (
        <TouchableOpacity
          key={recurso.id}
          style={styles.card}
          onPress={() => abrirLink(recurso.link)}
        >
          <View style={styles.cardContent}>
            <Ionicons
              name={
                recurso.tipo === 'manual'
                  ? 'document-text-outline'
                  : recurso.tipo === 'tutorial'
                  ? 'list-outline'
                  : recurso.tipo === 'link'
                  ? 'link-outline'
                  : 'videocam-outline'
              }
              size={24}
              color="#333"
            />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitulo}>{recurso.titulo}</Text>
              <Text style={styles.cardDescricao}>{recurso.descricao}</Text>
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
    marginBottom: 20,
    color: '#333',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescricao: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default RecursosScreen;