import { View, Text, StyleSheet } from 'react-native';

export default function CategoriaCard({ categoria }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{categoria}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});