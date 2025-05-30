import React, { createContext, useState, useContext } from 'react';
import api from '../servicos/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const login = async (email, senha) => {
    try {
      setCarregando(true);
      const response = await api.post('/auth/login', { email, senha });
      setUsuario(response.data.usuario);
      localStorage.setItem('token', response.data.token);
    } catch (erro) {
      throw new Error(erro.response?.data?.mensagem || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}