import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Defina manualmente o IP que funciona ou use a lógica de detecção
const API_BASE_URL = 'http://192.168.5.38:5000/api'; // Use o IP que você testou e funcionou

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Aumente para 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicione logs para debug
api.interceptors.request.use((config) => {
  console.log(`Enviando requisição para: ${config.baseURL}${config.url}`);
  return AsyncStorage.getItem('token').then((token) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
});

api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response.config.url);
    return response;
  },
  (error) => {
    console.error('Erro na requisição:', {
      url: error.config?.url,
      message: error.message,
      code: error.code
    });
    
    if (error.response?.status === 401) {
      AsyncStorage.removeItem('token');
    }
    
    return Promise.reject(error);
  }
);

export default api;