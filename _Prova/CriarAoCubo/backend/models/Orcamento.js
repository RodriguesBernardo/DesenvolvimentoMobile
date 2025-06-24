const mongoose = require('mongoose');

const OrcamentoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  arquivo: {
    type: String,
    required: true
  },
  nomeArquivo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'em_analise', 'finalizado'],
    default: 'pendente'
  },
  valor: {
    type: Number,
    default: null
  },
  observacoes: {
    type: String,
    default: ''
  },
  dataEnvio: {
    type: Date,
    default: Date.now
  },
  dataResposta: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Orcamento', OrcamentoSchema);