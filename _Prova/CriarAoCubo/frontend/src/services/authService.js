import api from './api';

export const login = async (email, senha) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error.response?.data?.mensagem || error.message);
    return null;
  }
};

export const registrar = async (nome, email, senha) => {
  try {
    const response = await api.post('/auth/registrar', { nome, email, senha });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar:', error.response?.data?.mensagem || error.message);
    return null;
  }
};