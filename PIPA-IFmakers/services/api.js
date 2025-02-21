// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // URL do json-server
});

// Buscar todas as notícias
export const fetchNews = async () => {
  const response = await api.get('/news');
  return response.data;
};

// Adicionar uma nova notícia
export const addNews = async (news) => {
  const response = await api.post('/news', news);
  return response.data;
};

// Atualizar uma notícia existente
export const updateNews = async (id, news) => {
  const response = await api.put(`/news/${id}`, news);
  return response.data;
};

// Remover uma notícia
export const deleteNews = async (id) => {
  const response = await api.delete(`/news/${id}`);
  return response.data;
};