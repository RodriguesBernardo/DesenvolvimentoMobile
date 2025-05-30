const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pedidosRoutes = require('./routes/pedidoRoutes');
const noticiaRoutes = require('./routes/noticiaRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Para servir os arquivos enviados

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/noticias', noticiaRoutes);


// Conexão e servidor
mongoose.connect('mongodb://localhost:27017/impressao3d').then(() => {
  console.log('MongoDB conectado');
  app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
});