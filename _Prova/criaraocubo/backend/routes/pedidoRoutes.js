const express = require('express');
const router = express.Router();
const { proteger } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const {
  criarPedido,
  getMeusPedidos,
  getPedidoPorId,
  downloadArquivoPedido
} = require('../controllers/pedidoController');

router.post('/', proteger, upload.single('arquivo'), criarPedido);
router.get('/meus-pedidos', proteger, getMeusPedidos);
router.get('/:id', proteger, getPedidoPorId);
router.get('/:id/download', proteger, downloadArquivoPedido);

module.exports = router;