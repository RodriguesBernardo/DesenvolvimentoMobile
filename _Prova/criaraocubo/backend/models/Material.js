const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String
  },
  coresDisponiveis: [{
    nome: String,
    codigoHex: String
  }],
  precoPorGram: {
    type: Number,
    required: true
  },
  tempoImpressaoPorGram: {
    type: Number, // em minutos
    required: true
  },
  disponivel: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Material', MaterialSchema);