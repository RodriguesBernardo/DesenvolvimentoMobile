import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button ,StyleSheet, Text, View } from 'react-native';


export default function App() {
  const nome = 'Bernardo Gostenski Rodrigues'

  const [contador, setContador] = useState(0)
  
  const incremetar = () => setContador((prev) => prev + 1)
  const decrementar = () => setContador((prev) => prev - 1)
  const limpar = () => setContador(0)


  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Olá! {nome}</Text>
      <Text style={styles.texto}>Contador de cliques: {contador}</Text>
      <View style={styles.subtitulo}>
        <Button title='Clique aqui para incrementar' onPress={incremetar} />
        <Button title='Clique aqui para decrementar ' onPress={decrementar} />
        <Button title='Clique aqui para zerar' onPress={limpar} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  subtitulo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  texto: {
    color: 'blue',
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
