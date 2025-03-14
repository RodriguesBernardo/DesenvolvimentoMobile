import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  const [username, setUsername] = useState('Usuário');
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeName = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo, {username}!</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      ) : null}
      <Button title={isEditing ? "Salvar" : "Alterar Nome"} onPress={handleChangeName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default WelcomeScreen;