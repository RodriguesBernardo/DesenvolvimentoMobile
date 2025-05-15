require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importar rotas
const auth = require('./routes/auth');
const news = require('./routes/news');
const games = require('./routes/games');
const rules = require('./routes/rules');
const help = require('./routes/help');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Montar rotas
app.use('/api/v1/auth', auth);
app.use('/api/v1/news', news);
app.use('/api/v1/games', games);
app.use('/api/v1/rules', rules);
app.use('/api/v1/help', help);

// Definir porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));