import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { bootstrap } from '../estilos/bootstrapStyles';
import { useAuth } from '../contexto/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, senha);
    } catch (error) {
      Alert.alert('Erro', 'Credenciais inválidas ou problema de conexão');
    }
  };

  return (
    <View style={bootstrap.styles.container}>
      <Text style={[bootstrap.styles.textCenter, { fontSize: 24, marginBottom: 30 }]}>
        Criar³ - Impressão 3D
      </Text>
      
      <TextInput
        style={bootstrap.styles.formControl}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={bootstrap.styles.formControl}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      
      <TouchableOpacity 
        style={bootstrap.styles.btnPrimary}
        onPress={handleLogin}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={{ marginTop: 15 }}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={bootstrap.styles.textCenter}>
          Não tem conta? <Text style={{ color: 'blue' }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;