import { useState, useContext } from 'react';
import { Box, Button, FormControl, Input, Stack, Text, Link, Alert } from 'native-base';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);
      const success = await login(email, password);
      if (success) {
        navigation.replace('Home');
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} justifyContent="center" p={4} safeArea>
      <Text fontSize="2xl" bold mb={6} textAlign="center">Criar ao Cubo</Text>
      
      {error && (
        <Alert status="error" mb={4}>
          <Alert.Icon />
          <Text>{error}</Text>
        </Alert>
      )}

      <FormControl mb={4}>
        <Stack space={4}>
          <Input
            placeholder="Email"
            id="login-email-input"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            size="lg"
          />
          <Input
            placeholder="Senha"
            id="login-password-input"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            size="lg"
          />
        </Stack>
      </FormControl>
      
      <Button 
        onPress={handleLogin} 
        mb={4}
        isLoading={isLoading}
        isLoadingText="Entrando..."
        size="lg"
      >
        Entrar
      </Button>
      
      <Text textAlign="center">
        Não tem conta?{' '}
        <Link onPress={() => navigation.navigate('Register')} _text={{ color: 'primary.500' }}>
          Registre-se
        </Link>
      </Text>
    </Box>
  );
}