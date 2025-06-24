import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [carregando, setCarregando] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Obrigatório'),
    senha: Yup.string().required('Obrigatório')
  });

  const handleLogin = async (values) => {
    setCarregando(true);
    const sucesso = await login(values.email, values.senha);
    setCarregando(false);
    
    if (!sucesso) {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CriaraoCubo</Text>
      <Text style={styles.subtitulo}>Login</Text>
      
      <Formik
        initialValues={{ email: '', senha: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Input
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              error={touched.email && errors.email}
            />
            
            <Input
              placeholder="Senha"
              onChangeText={handleChange('senha')}
              onBlur={handleBlur('senha')}
              value={values.senha}
              secureTextEntry
              error={touched.senha && errors.senha}
            />
            
            <Button 
              title="Entrar" 
              onPress={handleSubmit} 
              loading={carregando} 
            />
          </View>
        )}
      </Formik>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333'
  },
  subtitulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666'
  },
  form: {
    marginBottom: 20
  },
  link: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: 15
  }
});

export default LoginScreen;