const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Middleware para proteger rotas
exports.proteger = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ erro: 'Não autorizado, token não fornecido' });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obter usuário do token
    req.usuario = await Usuario.findById(decoded.id).select('-senha');

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ erro: 'Não autorizado, token inválido' });
  }
};

// Middleware para verificar se é admin
exports.admin = (req, res, next) => {
  if (req.usuario && req.usuario.isAdmin) {
    next();
  } else {
    res.status(403).json({ erro: 'Não autorizado como administrador' });
  }
};