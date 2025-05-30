const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  arquivo: { type: String },
  status: { type: String, enum: ['pendente', 'cancelado', 'concluido'], default: 'pendente' },
  valor: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pedido', PedidoSchema);
