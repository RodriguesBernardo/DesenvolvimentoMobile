import { Button, Input, VStack } from 'native-base';
import { useState } from 'react';
import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {
        nome,
        email,
        senha,
        tipo: 'cliente', // ou "admin" se quiser testar como admin
      });
      navigation.navigate('Login');
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <VStack space={4} p={4}>
      <Input placeholder="Nome" onChangeText={setNome} value={nome} />
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Input placeholder="Senha" type="password" onChangeText={setSenha} value={senha} />
      <Button onPress={handleRegister}>Registrar</Button>
    </VStack>
  );
}
