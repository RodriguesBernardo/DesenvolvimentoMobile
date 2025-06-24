const express = require('express');
const router = express.Router();
const { proteger, admin } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const {
  enviarOrcamento,
  obterMeusOrcamentos,
  obterTodosOrcamentos,
  atualizarOrcamento,
  baixarArquivo
} = require('../controllers/orcamentoController');

router.post('/', proteger, upload.single('arquivo'), (req, res, next) => {
  console.log('Arquivo recebido no middleware:', req.file);
  next();
}, enviarOrcamento);
router.get('/meus-orcamentos', proteger, obterMeusOrcamentos);
router.get('/', proteger, admin, obterTodosOrcamentos);
router.put('/:id', proteger, admin, atualizarOrcamento);
router.get('/:id/download', proteger, baixarArquivo);

module.exports = router;