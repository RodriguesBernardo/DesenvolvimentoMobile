import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { getReceitaById, toggleFavorito } from '../../data/receitas';

export default function ReceitaDetalhesScreen({ route }) {
  const { id } = route.params;
  const [receita, setReceita] = useState(getReceitaById(id));
  const [isFavorito, setIsFavorito] = useState(receita.favorito);

  const handleToggleFavorito = () => {
    const novoStatus = toggleFavorito(receita.id);
    setIsFavorito(novoStatus);
    setReceita(getReceitaById(id));
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: receita.imagem }} style={styles.imagem} />
      <View style={styles.header}>
        <Text style={styles.titulo}>{receita.titulo}</Text>
        <TouchableOpacity onPress={handleToggleFavorito} style={styles.favoritoBtn}>
          <Text style={styles.favoritoText}>
            {isFavorito ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.tempo}>Tempo de preparo: {receita.tempoPreparo}</Text>
        
        <Text style={styles.subtitulo}>Ingredientes:</Text>
        {receita.ingredientes.map((ingrediente, index) => (
          <Text key={index} style={styles.texto}>• {ingrediente}</Text>
        ))}
        
        <Text style={styles.subtitulo}>Modo de Preparo:</Text>
        {receita.modoPreparo.map((passo, index) => (
          <Text key={index} style={styles.texto}>{index + 1}. {passo}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imagem: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    flex: 1,
  },
  tempo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    color: '#333',
  },
  texto: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 24,
  },
  favoritoBtn: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginLeft: 16,
  },
  favoritoText: {
    fontSize: 14,
  },
});