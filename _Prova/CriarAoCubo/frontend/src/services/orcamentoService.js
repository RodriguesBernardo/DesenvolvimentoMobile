import api from './api';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

export const enviarOrcamento = async (file) => {
  try {
    const formData = new FormData();
    
    // Obter o arquivo diretamente sem conversão para base64
    const response = await fetch(file.uri);
    const blob = await response.blob();
    
    formData.append('arquivo', blob, file.name);

    const responseApi = await api.post('/orcamentos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return responseApi.data;
  } catch (error) {
    const errorMessage = error.response?.data?.mensagem || 
                        error.response?.data?.message || 
                        'Erro ao enviar arquivo';
    throw new Error(errorMessage);
  }
};

// Função auxiliar para converter URI para Blob
const uriToBlob = async (uri) => {
  const response = await fetch(uri);
  return await response.blob();
};

export const obterMeusOrcamentos = async () => {
  try {
    const response = await api.get('/orcamentos/meus-orcamentos');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter orçamentos:', error.response?.data?.mensagem || error.message);
    throw error;
  }
};

export const obterTodosOrcamentos = async () => {
  try {
    const response = await api.get('/orcamentos');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter todos os orçamentos:', error.response?.data?.mensagem || error.message);
    throw error;
  }
};

export const atualizarOrcamento = async (id, dados) => {
  try {
    const response = await api.put(`/orcamentos/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error.response?.data?.mensagem || error.message);
    throw error;
  }
};

export const baixarArquivo = async (orcamentoId, nomeArquivo) => {
  try {
    const response = await api.get(`/orcamentos/${orcamentoId}/download`, {
      responseType: 'blob'
    });

    // Verifica se está no ambiente web
    if (Platform.OS === 'web') {
      // Solução para web
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nomeArquivo);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } else {
      // Solução para mobile (Expo)
      const fileUri = FileSystem.cacheDirectory + nomeArquivo;
      await FileSystem.writeAsStringAsync(fileUri, response.data, {
        encoding: FileSystem.EncodingType.Base64
      });
      await Sharing.shareAsync(fileUri);
      return true;
    }
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error);
    throw error;
  }
};