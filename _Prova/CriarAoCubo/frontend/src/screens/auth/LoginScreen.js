import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>CriaraoCubo</Text>
          <Text style={styles.subtitulo}>Acesse sua conta</Text>
        </View>
        
        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <View style={styles.card}>
                <Input
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email && errors.email}
                  icon="email"
                />
                
                <Input
                  placeholder="Senha"
                  onChangeText={handleChange('senha')}
                  onBlur={handleBlur('senha')}
                  value={values.senha}
                  secureTextEntry
                  error={touched.senha && errors.senha}
                  icon="lock"
                />
              </View>
              
              <Button 
                title="Entrar" 
                onPress={handleSubmit} 
                loading={carregando}
                icon="login"
                style={styles.botao}
              />
            </View>
          )}
        </Formik>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('Register')} 
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Não tem uma conta? </Text>
          <Text style={styles.link}>Registre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 32,
    backgroundColor: '#3F51B5',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 8
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#E0E0E0'
  },
  formContainer: {
    paddingHorizontal: 24
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    elevation: 2
  },
  botao: {
    backgroundColor: '#4CAF50'
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    padding: 16
  },
  linkText: {
    color: '#757575'
  },
  link: {
    color: '#3F51B5',
    fontWeight: '500'
  }
});

export default LoginScreen;