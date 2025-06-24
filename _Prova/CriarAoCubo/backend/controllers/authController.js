const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// @desc    Autenticar usuário e obter token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (usuario && (await usuario.compararSenha(senha))) {
    res.json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
      token: gerarToken(usuario._id)
    });
  } else {
    res.status(401).json({ mensagem: 'Email ou senha inválidos' });
  }
};

// @desc    Registrar novo usuário
// @route   POST /api/auth/registrar
// @access  Public
const registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuarioExiste = await Usuario.findOne({ email });

  if (usuarioExiste) {
    res.status(400).json({ mensagem: 'Usuário já existe' });
    return;
  }

  const usuario = await Usuario.create({
    nome,
    email,
    senha
  });

  if (usuario) {
    res.status(201).json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
      token: gerarToken(usuario._id)
    });
  } else {
    res.status(400).json({ mensagem: 'Dados inválidos' });
  }
};

// Gerar JWT
const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

module.exports = {
  login,
  registrar
};