const express = require('express');
const Pedido = require('../models/Pedido');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const router = express.Router();

// Protege todas as rotas abaixo
router.use(authMiddleware);

// Criar pedido
router.post('/', upload.single('arquivo'), async (req, res) => {
  const { descricao } = req.body;
  const arquivo = req.file?.filename;

  const pedido = new Pedido({
    descricao,
    arquivo,
    user: req.userId,
  });

  await pedido.save();
  res.status(201).json(pedido);
});

// Listar meus pedidos (cliente)
router.get('/me', async (req, res) => {
  const pedidos = await Pedido.find({ user: req.userId });
  res.json(pedidos);
});

// Listar todos os pedidos (admin)
router.get('/', async (req, res) => {
  const user = req.user;
  if (user.tipo !== 'admin') return res.status(403).send('Acesso negado');
  const pedidos = await Pedido.find().populate('user', 'nome email');
  res.json(pedidos);
});

// Enviar orçamento (admin)
router.put('/:id/orcamento', async (req, res) => {
  const { valor } = req.body;
  const user = req.user;
  if (user.tipo !== 'admin') return res.status(403).send('Acesso negado');

  const pedido = await Pedido.findByIdAndUpdate(req.params.id, { valor }, { new: true });
  res.json(pedido);
});

// Cancelar pedido (admin)
router.put('/:id/cancelar', async (req, res) => {
  const user = req.user;
  if (user.tipo !== 'admin') return res.status(403).send('Acesso negado');

  const pedido = await Pedido.findByIdAndUpdate(req.params.id, { status: 'cancelado' }, { new: true });
  res.json(pedido);
});

module.exports = router;
