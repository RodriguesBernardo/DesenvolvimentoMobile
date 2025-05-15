const mongoose = require('mongoose');

const HelpSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor adicione um título']
  },
  content: {
    type: String,
    required: [true, 'Por favor adicione o conteúdo']
  },
  category: {
    type: String,
    enum: ['impressora3d', 'cortadoraLaser', 'notebooks'],
    required: [true, 'Por favor selecione uma categoria']
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

module.exports = mongoose.model('Help', HelpSchema);