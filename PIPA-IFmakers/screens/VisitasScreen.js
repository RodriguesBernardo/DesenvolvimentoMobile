import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList, Modal } from 'react-native';

const VisitasScreen = () => {
  // Dados de exemplo para as visitas
  const visitas = [
    {
      id: '1',
      titulo: 'XV EGEM',
      descricao: 'Encontro Gaúcho de Educação Matemática.',
      participantes: 'Elisa Martins, Eduardo Pompermayer, Diego Lieban',
      fotos: [
        require('../assets/visitas/xvegem/Imagem9.jpg'),
        require('../assets/visitas/xvegem/Imagem10.png'),
        require('../assets/visitas/xvegem/Imagem11.png'),
        require('../assets/visitas/xvegem/Imagem12.png'),
        require('../assets/visitas/xvegem/Imagem13.png'),
        require('../assets/visitas/xvegem/Imagem14.png'),
        require('../assets/visitas/xvegem/Imagem15.png'),
      ],
    },
    {
      id: '2',
      titulo: 'Conexão RS',
      descricao: 'Encontro para entusiastas da OBMEP.',
      participantes: 'Gabriele Batisti, Morgana Carniel, Ana Amália Cenci, Julia Fagundes, Diego Lieban, Ruana Scheneider',
      fotos: [
        require('../assets/visitas/conexao/Imagem1.jpg'),
        require('../assets/visitas/conexao/Imagem2.jpg'),
        require('../assets/visitas/conexao/Imagem3.jpg'),
        require('../assets/visitas/conexao/Imagem4.jpg'),
        require('../assets/visitas/conexao/Imagem5.jpg'),
        require('../assets/visitas/conexao/Imagem6.jpg'),
        require('../assets/visitas/conexao/Imagem7.jpg'),
      ],
    },
    {
        id: '3',
        titulo: 'Oficina de Robótica',
        descricao: 'Projeto Bombeiro Mirim',
        participantes: 'Ronaldo Serpa da Rosa',
        fotos: [
/*             require('../assets/visitas/robotica/Imagem1.jpg'),
            require('../assets/visitas/robotica/Imagem2.jpg'),
            require('../assets/visitas/robotica/Imagem3.jpg'), */
        ],
    },
    {
        id: '4',
        titulo: '5º Rústica SESC/Caitá',
        descricao: 'Bento Gonçalves',
        fotos: [
  /*           require('../assets/visitas/rustica/Imagem1.jpg'), */
        ],
    },
    {
        id: '5',
        titulo: 'Produções de Materiais Pedagógicos',
        descricao: 'Licenciatura em Letras',
        fotos: [
/*             require('../assets/visitas/letras/Imagem1.jpg'),
            require('../assets/visitas/letras/Imagem2.jpg'),
            require('../assets/visitas/letras/Imagem3.jpg'),
            require('../assets/visitas/letras/Imagem4.jpg'),
            require('../assets/visitas/letras/Imagem5.jpg'),
            require('../assets/visitas/letras/Imagem6.jpg'),
            require('../assets/visitas/letras/Imagem7.jpg'),
            require('../assets/visitas/letras/Imagem8.jpg'), */
        ],
    },

  ];

  const [visitaSelecionada, setVisitaSelecionada] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  // Função para abrir o modal com a visita selecionada
  const abrirModal = (visita) => {
    setVisitaSelecionada(visita);
    setModalVisivel(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalVisivel(false);
    setVisitaSelecionada(null);
  };

  return (
    <ScrollView style={styles.container}>
      {visitas.map((visita) => (
        <TouchableOpacity
          key={visita.id}
          style={styles.card}
          onPress={() => abrirModal(visita)} // Abre o modal ao clicar no card
        >
          <Image source={visita.fotos[0]} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitulo}>{visita.titulo}</Text>
            <Text style={styles.cardDescricao}>{visita.descricao}</Text>
            {visita.participantes && (
              <Text style={styles.cardParticipantes}>{visita.participantes}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal para exibir a descrição completa e a galeria de fotos */}
      <Modal visible={modalVisivel} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>{visitaSelecionada?.titulo}</Text>
            <Text style={styles.modalDescricao}>{visitaSelecionada?.descricao}</Text>
            {visitaSelecionada?.participantes && (
              <Text style={styles.modalParticipantes}>{visitaSelecionada.participantes}</Text>
            )}

            {/* Galeria de fotos */}
            <FlatList
              horizontal
              data={visitaSelecionada?.fotos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image source={item} style={styles.modalImage} />
              )}
              showsHorizontalScrollIndicator={false}
            />

            {/* Botão para fechar o modal */}
            <TouchableOpacity style={styles.fecharBotao} onPress={fecharModal}>
              <Text style={styles.fecharBotaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescricao: {
    fontSize: 14,
    color: '#666',
  },
  cardParticipantes: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescricao: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalParticipantes: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  modalImage: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'cover',
  },
  fecharBotao: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#b42622',
    borderRadius: 5,
    alignItems: 'center',
  },
  fecharBotaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VisitasScreen;