import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../contexto/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, carregando } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, senha);
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text>Senha:</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button
        title={carregando ? "Carregando..." : "Entrar"}
        onPress={handleLogin}
        disabled={carregando}
      />
      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  );
}