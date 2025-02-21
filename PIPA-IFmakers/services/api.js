// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchNews = async () => {
  const response = await api.get('/news');
  return response.data;
};

export const addNews = async (news) => {
  const response = await api.post('/news', news);
  return response.data;
};

export const updateNews = async (id, news) => {
  const response = await api.put(`/news/${id}`, news);
  return response.data;
};

export const deleteNews = async (id) => {
  const response = await api.delete(`/news/${id}`);
  return response.data;
};