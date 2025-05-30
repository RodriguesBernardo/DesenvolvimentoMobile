import { Button, Input, VStack } from 'native-base';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <VStack space={4} p={4}>
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Input placeholder="Senha" type="password" onChangeText={setSenha} value={senha} />
      <Button onPress={() => login(email, senha)}>Entrar</Button>
      <Button variant="ghost" onPress={() => navigation.navigate('Register')}>Criar conta</Button>
    </VStack>
  );
}
