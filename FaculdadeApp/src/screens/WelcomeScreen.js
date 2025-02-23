import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';

const WelcomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  const handleSaveName = async () => {
    if (!userName) {
      Alert.alert('Erro', 'Por favor, insira seu nome.');
      return;
    }

    try {
      // Salva o nome do usuário no AsyncStorage
      await AsyncStorage.setItem('userName', userName);
      // Salva a flag de primeiro uso
      await AsyncStorage.setItem('hasLaunched', 'true');
      console.log('Nome salvo com sucesso:', userName); // Log para depuração

      // Navega para a tela principal (Main)
      navigation.replace('Main');
    } catch (error) {
      console.error('Erro ao salvar o nome:', error); // Log para depuração
      Alert.alert('Erro', 'Não foi possível salvar o nome. Tente novamente.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem-vindo ao FaculdadeApp!</Text>
      <Text style={globalStyles.text}>Por favor, insira seu nome para começar:</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Digite seu nome"
        value={userName}
        onChangeText={setUserName}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSaveName}>
        <Text style={globalStyles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;