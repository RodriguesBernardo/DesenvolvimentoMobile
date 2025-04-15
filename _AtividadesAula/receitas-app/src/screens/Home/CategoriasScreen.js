import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import CategoriaCard from '../../components/CategoriaCard';
import { categorias } from '../../data/receitas';

export default function CategoriasScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Receitas', { categoria: item })}>
            <CategoriaCard categoria={item} />
          </Pressable>
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