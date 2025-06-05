import { useState, useContext } from 'react';
import { Box, Button, FormControl, Input, Stack, Text, Link, Alert } from 'native-base';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      setError('');
      setIsLoading(true);
      const success = await register(name, email, password);
      if (success) {
        navigation.replace('Home');
      }
    } catch (err) {
      setError('Erro ao registrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} justifyContent="center" p={4} safeArea>
      <Text fontSize="2xl" bold mb={6} textAlign="center">Criar Conta</Text>
      
      {error && (
        <Alert status="error" mb={4}>
          <Alert.Icon />
          <Text>{error}</Text>
        </Alert>
      )}

      <FormControl mb={4}>
        <Stack space={4}>
          <Input
            placeholder="Nome"
            id="register-name-input"
            value={name}
            onChangeText={setName}
            size="lg"
          />
          <Input
            placeholder="Email"
            id="register-email-input"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            size="lg"
          />
          <Input
            placeholder="Senha"
            id="register-password-input"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            size="lg"
          />
        </Stack>
      </FormControl>
      
      <Button 
        onPress={handleRegister} 
        mb={4}
        isLoading={isLoading}
        isLoadingText="Registrando..."
        size="lg"
      >
        Registrar
      </Button>
      
      <Text textAlign="center">
        Já tem conta?{' '}
        <Link onPress={() => navigation.navigate('Login')} _text={{ color: 'primary.500' }}>
          Faça login
        </Link>
      </Text>
    </Box>
  );
}