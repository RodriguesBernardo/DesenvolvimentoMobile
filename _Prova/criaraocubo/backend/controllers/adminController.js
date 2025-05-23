const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');
const Material = require('../models/Material');

// @desc    Obter todos os pedidos (Admin)
// @route   GET /api/admin/pedidos
// @access  Private/Admin
exports.getTodosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({})
      .sort('-dataPedido')
      .populate('usuario', 'nome email');

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
};

// @desc    Atualizar status do pedido
// @route   PUT /api/admin/pedidos/:id/status
// @access  Private/Admin
exports.atualizarStatusPedido = async (req, res) => {
  try {
    const { status } = req.body;
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    pedido.status = status;
    pedido.dataAtualizacao = Date.now();

    const pedidoAtualizado = await pedido.save();

    res.json(pedidoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar pedido' });
  }
};

// @desc    Obter todos os usuários
// @route   GET /api/admin/usuarios
// @access  Private/Admin
exports.getTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}).select('-senha');
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
};

// @desc    Obter usuário por ID
// @route   GET /api/admin/usuarios/:id
// @access  Private/Admin
exports.getUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-senha');

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
};

// @desc    Atualizar usuário (Admin)
// @route   PUT /api/admin/usuarios/:id
// @access  Private/Admin
exports.atualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuario.nome = req.body.nome || usuario.nome;
    usuario.email = req.body.email || usuario.email;
    usuario.telefone = req.body.telefone || usuario.telefone;
    usuario.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : usuario.isAdmin;

    const usuarioAtualizado = await usuario.save();

    res.json({
      _id: usuarioAtualizado._id,
      nome: usuarioAtualizado.nome,
      email: usuarioAtualizado.email,
      isAdmin: usuarioAtualizado.isAdmin,
      telefone: usuarioAtualizado.telefone
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
};

// @desc    Deletar usuário
// @route   DELETE /api/admin/usuarios/:id
// @access  Private/Admin
exports.deletarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    await usuario.remove();
    res.json({ mensagem: 'Usuário removido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao remover usuário' });
  }
};

// @desc    Criar novo material
// @route   POST /api/admin/materiais
// @access  Private/Admin
exports.criarMaterial = async (req, res) => {
  try {
    const { nome, descricao, coresDisponiveis, precoPorGram, tempoImpressaoPorGram } = req.body;

    const materialExiste = await Material.findOne({ nome });
    if (materialExiste) {
      return res.status(400).json({ erro: 'Material já existe' });
    }

    const material = await Material.create({
      nome,
      descricao,
      coresDisponiveis,
      precoPorGram,
      tempoImpressaoPorGram
    });

    res.status(201).json(material);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar material' });
  }
};

// @desc    Atualizar material
// @route   PUT /api/admin/materiais/:id
// @access  Private/Admin
exports.atualizarMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ erro: 'Material não encontrado' });
    }

    material.nome = req.body.nome || material.nome;
    material.descricao = req.body.descricao || material.descricao;
    material.coresDisponiveis = req.body.coresDisponiveis || material.coresDisponiveis;
    material.precoPorGram = req.body.precoPorGram || material.precoPorGram;
    material.tempoImpressaoPorGram = req.body.tempoImpressaoPorGram || material.tempoImpressaoPorGram;
    material.disponivel = req.body.disponivel !== undefined ? req.body.disponivel : material.disponivel;

    const materialAtualizado = await material.save();

    res.json(materialAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar material' });
  }
};

// @desc    Obter todos os materiais
// @route   GET /api/admin/materiais
// @access  Public
exports.getTodosMateriais = async (req, res) => {
  try {
    const materiais = await Material.find({});
    res.json(materiais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar materiais' });
  }
};