// screens/HelpScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import HelpCard from '../components/HelpCard';
import { useNavigation } from '@react-navigation/native';

// Importe as imagens locais
const cncLaserImage = require('../assets/CNC.jpg');
const impressora3DImage = require('../assets/impressoras.jpg');

const HelpScreen = () => {
  const navigation = useNavigation(); // Hook para navegação

  const helpItems = [
    {
      id: 1,
      title: 'CNC Corte a Laser',
      content:
        'A cortadora LASEer é uma ferramenta poderosa para cortes precisos. Aqui estão algumas dicas:\n\n' +
        '1. Certifique-se de que o material esteja bem posicionado.\n' +
        '2. Configure a potência do laser de acordo com o material.\n' +
        '3. Use óculos de proteção ao operar o equipamento.',
      image: cncLaserImage, // Use a variável importada
    },
    {
      id: 2,
      title: 'Impressoras 3D',
      content:
        'As impressoras 3D permitem criar objetos incríveis. Siga estas dicas:\n\n' +
        '1. Escolha o filamento adequado para o seu projeto.\n' +
        '2. Calibre a mesa de impressão antes de começar.\n' +
        '3. Verifique a temperatura do bico e da mesa.',
      image: impressora3DImage, // Use a variável importada
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {helpItems.map((item) => (
        <HelpCard
          key={item.id}
          title={item.title}
          content={item.content}
          image={item.image}
          onDoubleClick={() => navigation.navigate('HelpDetail', { item })} // Navega para a tela de detalhes
        />
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

export default HelpScreen;