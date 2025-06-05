require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Configuração detalhada do CORS
app.use(cors({
  origin: '*', // Permite todas origens (em desenvolvimento)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Conexão com o MongoDB com mais opções
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro na conexão com MongoDB:', err));

// Rotas
const authRoutes = require('./src/routes/authRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const fileRoutes = require('./src/routes/fileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/files', fileRoutes);

// Rota de saúde da API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  const address = server.address();
  console.log(`Servidor rodando em:
  - http://localhost:${PORT}
  - http://${getLocalIpAddress()}:${PORT}`);
});

// Função melhorada para pegar IP local
function getLocalIpAddress() {
  const interfaces = require('os').networkInterfaces();
  const results = [];
  
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        results.push(alias.address);
      }
    }
  }
  
  return results.length > 0 ? results[0] : 'localhost';
}