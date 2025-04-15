import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function ReceitaCard({ receita, navigation }) {
  return (
    <Pressable 
      onPress={() => navigation.navigate('ReceitaDetalhes', { id: receita.id })}
      style={styles.container}
    >
      <Image source={{ uri: receita.imagem }} style={styles.imagem} />
      <View style={styles.content}>
        <Text style={styles.titulo}>{receita.titulo}</Text>
        <Text style={styles.tempo}>{receita.tempoPreparo}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
  },
  imagem: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  tempo: {
    fontSize: 14,
    color: '#666',
  },
});