import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarUsuario = async () => {
      const usuarioArmazenado = await AsyncStorage.getItem('usuario');
      if (usuarioArmazenado) {
        setUsuario(JSON.parse(usuarioArmazenado));
      }
      setCarregando(false);
    };
    carregarUsuario();
  }, []);

  const login = async (email, senha) => {
    const resposta = await authService.login(email, senha);
    if (resposta) {
      setUsuario(resposta);
      await AsyncStorage.setItem('usuario', JSON.stringify(resposta));
      return true;
    }
    return false;
  };

  const registrar = async (nome, email, senha) => {
    const resposta = await authService.registrar(nome, email, senha);
    if (resposta) {
      setUsuario(resposta);
      await AsyncStorage.setItem('usuario', JSON.stringify(resposta));
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};