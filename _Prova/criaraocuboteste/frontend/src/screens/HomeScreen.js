import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch('http://<SEU_IP>:3000/api/noticias');
        const json = await res.json();
        setNoticias(json);
      } catch (err) {
        console.error('Erro ao buscar notícias:', err);
      }
    };

    fetchNoticias();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text>{item.conteudo}</Text>
      <Text style={styles.date}>{item.data}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notícias</Text>
      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhuma notícia publicada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  date: { marginTop: 5, fontStyle: 'italic', fontSize: 12, color: '#333' },
});
