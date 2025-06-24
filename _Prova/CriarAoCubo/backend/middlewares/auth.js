const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const proteger = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decoded.id).select('-senha');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ mensagem: 'Token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ mensagem: 'Não autorizado, token não fornecido' });
  }
};

const admin = (req, res, next) => {
  if (req.usuario && req.usuario.isAdmin) {
    next();
  } else {
    res.status(403).json({ mensagem: 'Não autorizado como administrador' });
  }
};

module.exports = { proteger, admin };