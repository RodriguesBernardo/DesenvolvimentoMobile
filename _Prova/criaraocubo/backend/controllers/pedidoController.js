const Pedido = require('../models/Pedido');
const Material = require('../models/Material');
const fs = require('fs');
const path = require('path');

// @desc    Criar novo pedido
// @route   POST /api/pedidos
// @access  Private
exports.criarPedido = async (req, res) => {
  try {
    const { nomeProjeto, material, cor, dimensoes, observacoes } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ erro: 'Por favor, envie um arquivo' });
    }

    // Calcular preço estimado (simplificado)
    const materialInfo = await Material.findOne({ nome: material });
    const precoEstimado = materialInfo ? dimensoes.altura * dimensoes.largura * dimensoes.profundidade * materialInfo.precoPorGram : 0;

    const pedido = await Pedido.create({
      usuario: req.usuario._id,
      nomeProjeto,
      arquivo: {
        nome: req.file.originalname,
        caminho: req.file.path,
        tipo: req.file.mimetype
      },
      material,
      cor,
      dimensoes,
      observacoes,
      preco: precoEstimado,
      tempoEstimado: materialInfo ? dimensoes.altura * dimensoes.largura * dimensoes.profundidade * materialInfo.tempoImpressaoPorGram / 60 : 0
    });

    res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar pedido' });
  }
};

// @desc    Obter pedidos do usuário
// @route   GET /api/pedidos/meus-pedidos
// @access  Private
exports.getMeusPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario._id })
      .sort('-dataPedido')
      .populate('usuario', 'nome email');

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
};

// @desc    Obter pedido por ID
// @route   GET /api/pedidos/:id
// @access  Private
exports.getPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('usuario', 'nome email');

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    // Verificar se o usuário é o dono do pedido ou admin
    if (pedido.usuario._id.toString() !== req.usuario._id.toString() && !req.usuario.isAdmin) {
      return res.status(401).json({ erro: 'Não autorizado' });
    }

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar pedido' });
  }
};

// @desc    Download do arquivo do pedido
// @route   GET /api/pedidos/:id/download
// @access  Private
exports.downloadArquivoPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    // Verificar se o usuário é o dono do pedido ou admin
    if (pedido.usuario.toString() !== req.usuario._id.toString() && !req.usuario.isAdmin) {
      return res.status(401).json({ erro: 'Não autorizado' });
    }

    if (!fs.existsSync(pedido.arquivo.caminho)) {
      return res.status(404).json({ erro: 'Arquivo não encontrado' });
    }

    res.download(pedido.arquivo.caminho, pedido.arquivo.nome);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao baixar arquivo' });
  }
};