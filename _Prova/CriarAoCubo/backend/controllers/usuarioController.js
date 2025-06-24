const Usuario = require('../models/Usuario');

// @desc    Obter perfil do usuário
// @route   GET /api/usuarios/perfil
// @access  Private
const obterPerfil = async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id).select('-senha');
  
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
};

module.exports = {
  obterPerfil
};