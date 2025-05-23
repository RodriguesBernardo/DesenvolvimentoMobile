const express = require('express');
const router = express.Router();
const { proteger, admin } = require('../middlewares/auth');
const {
  getTodosPedidos,
  atualizarStatusPedido,
  getTodosUsuarios,
  getUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
  criarMaterial,
  atualizarMaterial,
  getTodosMateriais
} = require('../controllers/adminController');

router.get('/pedidos', proteger, admin, getTodosPedidos);
router.put('/pedidos/:id/status', proteger, admin, atualizarStatusPedido);
router.get('/usuarios', proteger, admin, getTodosUsuarios);
router.get('/usuarios/:id', proteger, admin, getUsuarioPorId);
router.put('/usuarios/:id', proteger, admin, atualizarUsuario);
router.delete('/usuarios/:id', proteger, admin, deletarUsuario);
router.post('/materiais', proteger, admin, criarMaterial);
router.put('/materiais/:id', proteger, admin, atualizarMaterial);
router.get('/materiais', getTodosMateriais);

module.exports = router;