const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Registrar novo usuário
// @route   POST /api/auth/registrar
// @access  Public
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Verificar se usuário já existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'Email já está em uso' });
    }

    // Criar usuário
    const usuario = await Usuario.create({
      nome,
      email,
      senha,
      telefone
    });

    // Gerar token
    const token = gerarToken(usuario._id);

    res.status(201).json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// @desc    Autenticar usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar usuário
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Verificar senha
    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = gerarToken(usuario._id);

    res.json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// @desc    Obter perfil do usuário
// @route   GET /api/auth/perfil
// @access  Private
exports.getPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id).select('-senha');
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// @desc    Atualizar perfil do usuário
// @route   PUT /api/auth/perfil
// @access  Private
exports.atualizarPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id);

    if (usuario) {
      usuario.nome = req.body.nome || usuario.nome;
      usuario.email = req.body.email || usuario.email;
      usuario.telefone = req.body.telefone || usuario.telefone;
      
      if (req.body.senha) {
        usuario.senha = req.body.senha;
      }

      const usuarioAtualizado = await usuario.save();

      res.json({
        _id: usuarioAtualizado._id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        isAdmin: usuarioAtualizado.isAdmin,
        token: gerarToken(usuarioAtualizado._id)
      });
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// Gerar JWT
const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};