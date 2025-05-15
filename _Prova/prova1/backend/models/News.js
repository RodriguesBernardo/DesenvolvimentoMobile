const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor adicione um título']
  },
  content: {
    type: String,
    required: [true, 'Por favor adicione o conteúdo']
  },
  image: {
    type: String
  },
  isEvent: {
    type: Boolean,
    default: false
  },
  eventDate: {
    type: Date
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

module.exports = mongoose.model('News', NewsSchema);