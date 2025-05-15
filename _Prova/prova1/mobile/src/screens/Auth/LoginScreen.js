import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', res.data.token);
      navigation.navigate('AdminDashboard');
    } catch (err) {
      Alert.alert('Erro', 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[tw`flex-1 justify-center p-6`, styles.container]}>
      <Text style={tw`text-3xl font-bold text-center text-primary mb-8`}>Login Admin</Text>
      
      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-700 mb-1`}>Email</Text>
        <TextInput
          style={tw`border rounded-lg p-3`}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-700 mb-1`}>Senha</Text>
        <View style={tw`flex-row items-center border rounded-lg`}>
          <TextInput
            style={tw`flex-1 p-3`}
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={tw`p-3`}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[tw`p-4 rounded-lg items-center`, styles.loginButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={tw`text-white font-bold`}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc'
  },
  loginButton: {
    backgroundColor: '#1E3A8A'
  }
});

export default LoginScreen;