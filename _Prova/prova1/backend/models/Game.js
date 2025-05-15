const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor adicione um nome']
  },
  description: {
    type: String,
    required: [true, 'Por favor adicione uma descrição']
  },
  creator: {
    type: String,
    required: [true, 'Por favor adicione o criador']
  },
  image: {
    type: String,
    required: [true, 'Por favor adicione uma imagem']
  },
  downloadFile: {
    type: String,
    required: [true, 'Por favor adicione o arquivo para download']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Game', GameSchema);