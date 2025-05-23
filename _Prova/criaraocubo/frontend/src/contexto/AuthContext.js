import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../servicos/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      const token = await AsyncStorage.getItem('@Criar3:token');
      const usuarioSalvo = await AsyncStorage.getItem('@Criar3:usuario');
      
      if (token && usuarioSalvo) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUsuario(JSON.parse(usuarioSalvo));
      }
      setCarregando(false);
    }
    
    carregarUsuario();
  }, []);

  async function login(email, senha) {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token, ...usuarioData } = response.data;
      
      await AsyncStorage.setItem('@Criar3:token', token);
      await AsyncStorage.setItem('@Criar3:usuario', JSON.stringify(usuarioData));
      
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUsuario(usuarioData);
      
      return usuarioData;
    } catch (error) {
      throw error;
    }
  }

  async function registrar(nome, email, senha, telefone) {
    try {
      const response = await api.post('/auth/registrar', { nome, email, senha, telefone });
      const { token, ...usuarioData } = response.data;
      
      await AsyncStorage.setItem('@Criar3:token', token);
      await AsyncStorage.setItem('@Criar3:usuario', JSON.stringify(usuarioData));
      
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUsuario(usuarioData);
      
      return usuarioData;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    await AsyncStorage.removeItem('@Criar3:token');
    await AsyncStorage.removeItem('@Criar3:usuario');
    delete api.defaults.headers.Authorization;
    setUsuario(null);
  }

  const value = {
    usuario,
    carregando,
    login,
    registrar,
    logout,
    setUsuario
  };

  return (
    <AuthContext.Provider value={value}>
      {!carregando && children}
    </AuthContext.Provider>
  );
}