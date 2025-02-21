// screens/HelpScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import HelpCard from '../components/HelpCard';

const HelpScreen = () => {
  const helpItems = [
    {
      id: 1,
      title: 'Como usar a LASEer',
      content:
        'A cortadora LASEer é uma ferramenta poderosa para cortes precisos. Aqui estão algumas dicas:\n\n' +
        '1. Certifique-se de que o material esteja bem posicionado.\n' +
        '2. Configure a potência do laser de acordo com o material.\n' +
        '3. Use óculos de proteção ao operar o equipamento.',
    },
    {
      id: 2,
      title: 'Impressoras 3D',
      content:
        'As impressoras 3D permitem criar objetos incríveis. Siga estas dicas:\n\n' +
        '1. Escolha o filamento adequado para o seu projeto.\n' +
        '2. Calibre a mesa de impressão antes de começar.\n' +
        '3. Verifique a temperatura do bico e da mesa.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {helpItems.map((item) => (
        <HelpCard key={item.id} title={item.title} content={item.content} />
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