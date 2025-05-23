const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  nomeProjeto: {
    type: String,
    required: true
  },
  arquivo: {
    nome: String,
    caminho: String,
    tipo: String
  },
  material: {
    type: String,
    required: true,
    enum: ['PLA', 'PETG', 'ABS', 'TPU', 'Resina']
  },
  cor: {
    type: String,
    required: true
  },
  dimensoes: {
    altura: Number,
    largura: Number,
    profundidade: Number,
    unidade: {
      type: String,
      default: 'mm'
    }
  },
  observacoes: {
    type: String
  },
  status: {
    type: String,
    enum: ['Recebido', 'Em análise', 'Em produção', 'Finalizado', 'Entregue', 'Cancelado'],
    default: 'Recebido'
  },
  dataPedido: {
    type: Date,
    default: Date.now
  },
  dataAtualizacao: {
    type: Date
  },
  preco: {
    type: Number
  },
  tempoEstimado: {
    type: Number // em horas
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);