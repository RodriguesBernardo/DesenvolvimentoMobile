import api from './api';

export const login = async (email, senha) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
  } catch (error) {
    throw error.response?.data?.erro || 'Erro ao fazer login';
  }
};

export const registrar = async (nome, email, senha, telefone) => {
  try {
    const response = await api.post('/auth/registrar', { nome, email, senha, telefone });
    return response.data;
  } catch (error) {
    throw error.response?.data?.erro || 'Erro ao registrar';
  }
};

export const getPerfil = async () => {
  try {
    const response = await api.get('/auth/perfil');
    return response.data;
  } catch (error) {
    throw error.response?.data?.erro || 'Erro ao carregar perfil';
  }
};

export const atualizarPerfil = async (dados) => {
  try {
    const response = await api.put('/auth/perfil', dados);
    return response.data;
  } catch (error) {
    throw error.response?.data?.erro || 'Erro ao atualizar perfil';
  }
};