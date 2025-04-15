import { FlatList, View, Text, StyleSheet } from 'react-native';
import ReceitaCard from '../components/ReceitaCard';
import { receitasFavoritas } from '../data/receitas';
import { useEffect, useState } from 'react';

export default function FavoritasScreen({ navigation }) {
  const [favoritas, setFavoritas] = useState(receitasFavoritas());

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFavoritas(receitasFavoritas());
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {favoritas.length > 0 ? (
        <FlatList
          data={favoritas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ReceitaCard 
              receita={item} 
              navigation={navigation} 
            />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma receita favoritada ainda</Text>
          <Text style={styles.emptySubtext}>Toque no ❤️ nas receitas para adicioná-las aqui</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  list: {
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});