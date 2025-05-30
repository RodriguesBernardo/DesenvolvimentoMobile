const Pedido = require('../models/Pedido');

exports.criarPedido = async (req, res) => {
  const { descricao } = req.body;
  const arquivo = req.file.filename;

  const pedido = await Pedido.create({
    descricao,
    arquivo,
    cliente: req.user._id
  });

  res.status(201).json(pedido);
};

exports.listarPedidos = async (req, res) => {
  const isAdmin = req.user.tipo === 'admin';
  const filtro = isAdmin ? {} : { cliente: req.user._id };
  const pedidos = await Pedido.find(filtro).populate('cliente', 'nome email');
  res.json(pedidos);
};

exports.atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status, valor } = req.body;

  const pedido = await Pedido.findByIdAndUpdate(id, { status, valor }, { new: true });
  res.json(pedido);
};
