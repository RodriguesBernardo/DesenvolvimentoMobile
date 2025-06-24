import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api'; // Substitua pelo IP da sua máquina

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(async (config) => {
  const usuario = await AsyncStorage.getItem('usuario');
  if (usuario) {
    const { token } = JSON.parse(usuario);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;