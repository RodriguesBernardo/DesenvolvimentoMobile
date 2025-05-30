const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Noticia', noticiaSchema);
