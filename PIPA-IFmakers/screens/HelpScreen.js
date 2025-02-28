import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import HelpCard from '../components/HelpCard';
import { useNavigation } from '@react-navigation/native';

const cncLaserImage = require('../assets/maquinas/CNC.jpg');
const impressora3DImage = require('../assets/maquinas/impressoras.jpg');
const notebookImage = require('../assets/maquinas/notebooks.jpg');

const HelpScreen = () => {
  const navigation = useNavigation(); 

  const helpItems = [
    {
      id: 1,
      title: 'CNC Corte a Laser',
      content:
        'A cortadora Laser é uma ferramenta poderosa para cortes precisos. Aqui estão algumas dicas:\n\n' +
        '1. Certifique-se de que o material esteja bem posicionado.\n' +
        '2. Configure a potência do laser de acordo com o material.\n' +
        '3. Use óculos de proteção ao operar o equipamento.\n' +
        '4. Verifique o foco do laser para garantir cortes precisos.\n' +
        '5. Mantenha o sistema de exaustão funcionando para remover fumaça e gases.\n' +
        '6. Faça testes em pedaços pequenos antes de cortar o material final.\n' +
        '7. Limpe regularmente as lentes e espelhos do laser.\n' +
        '8. Nunca deixe o equipamento funcionando sem supervisão.',
      image: cncLaserImage,
    },
    {
      id: 2,
      title: 'Impressoras 3D',
      content:
        'As impressoras 3D permitem criar objetos incríveis. Siga estas dicas:\n\n' +
        '1. Escolha o filamento adequado para o seu projeto.\n' +
        '2. Calibre a mesa de impressão antes de começar.\n' +
        '3. Ajuste a temperatura do bico e da mesa conforme o filamento.\n' +
        '4. Use suportes para partes suspensas da peça.\n' +
        '5. Ajuste a densidade do preenchimento conforme a resistência necessária.\n' +
        '6. Limpe o bico de impressão regularmente para evitar entupimentos.\n' +
        '7. Após a impressão, remova os suportes com cuidado.\n' +
        '8. Nunca toque no bico ou na mesa quente durante a impressão.\n' +
        '9. Imprima modelos de teste para verificar a precisão dimensional.',
      image: impressora3DImage,
    },
    {
      id: 3,
      title: 'Notebooks',
      content:
        'Os notebooks são ferramentas essenciais para o trabalho e estudo. Aqui estão algumas dicas:\n\n' +
        '1. Mantenha o sistema operacional e os aplicativos atualizados.\n' +
        '2. Faça backups regulares dos seus arquivos importantes.\n' +
        '3. Mantenha os notebooks carregados. \n' +
        '4. Evite comer ou beber próximo ao notebook para prevenir danos.\n' +
        '5. Limpe o teclado e a tela regularmente com produtos adequados.\n' +
        '6. Não obstrua as saídas de ar para evitar superaquecimento.\n' +
        '8. Não transporte o notebook com objetos pesados sobre ele.\n',
      image: notebookImage,
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {helpItems.map((item) => (
        <HelpCard
          key={item.id}
          title={item.title}
          content={item.content}
          image={item.image}
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