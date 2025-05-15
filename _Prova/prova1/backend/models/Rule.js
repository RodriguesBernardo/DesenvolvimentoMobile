const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor adicione um título']
  },
  description: {
    type: String,
    required: [true, 'Por favor adicione uma descrição']
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

module.exports = mongoose.model('Rule', RuleSchema);