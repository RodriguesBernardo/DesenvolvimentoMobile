import { FlatList, View, StyleSheet } from 'react-native';
import ReceitaCard from '../../components/ReceitaCard';
import { getReceitasPorCategoria } from '../../data/receitas';

export default function ReceitasScreen({ route, navigation }) {
  const { categoria } = route.params;
  const receitas = getReceitasPorCategoria(categoria);

  return (
    <View style={styles.container}>
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ReceitaCard 
            receita={item} 
            navigation={navigation} 
          />
        )}
        contentContainerStyle={styles.list}
      />
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
});