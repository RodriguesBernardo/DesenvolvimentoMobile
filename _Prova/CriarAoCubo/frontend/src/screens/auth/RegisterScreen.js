import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { registrar } = useContext(AuthContext);
  const [carregando, setCarregando] = useState(false);

  const registerSchema = Yup.object().shape({
    nome: Yup.string().required('Obrigatório'),
    email: Yup.string().email('Email inválido').required('Obrigatório'),
    senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Obrigatório')
  });

  const handleRegister = async (values) => {
    setCarregando(true);
    const sucesso = await registrar(values.nome, values.email, values.senha);
    setCarregando(false);
    
    if (!sucesso) {
      Alert.alert('Erro', 'Não foi possível registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CriaraoCubo</Text>
      <Text style={styles.subtitulo}>Registrar</Text>
      
      <Formik
        initialValues={{ nome: '', email: '', senha: '' }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Input
              placeholder="Nome"
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              value={values.nome}
              error={touched.nome && errors.nome}
            />
            
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
              title="Registrar" 
              onPress={handleSubmit} 
              loading={carregando} 
            />
          </View>
        )}
      </Formik>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta? Faça login</Text>
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

export default RegisterScreen;