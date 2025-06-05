import api from './api';

export const criarPedido = async (dados) => {
  try {
    const response = await api.post('/pedidos', dados);
    return response.data;
  } catch (error) {
    throw error.response?.data?.erro || 'Erro ao criar pedido';
  }
};

export const getMeusPedidos = async () => {
  try {
    const response = await api.get('/pedidos/meus-pedidos');
    return response.data;
  } catch (error) {
    throw error.response?.data?.erro || 'Erro ao carregar pedidos';
  }
};

export const getPedidoPorId = async (id) => {
  try {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.erro || 'Erro ao carregar pedido';
  }
};

export const downloadArquivoPedido = async (id) => {
  try {
    const response = await api.get(`/pedidos/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.erro || 'Erro ao baixar arquivo';
  }
};