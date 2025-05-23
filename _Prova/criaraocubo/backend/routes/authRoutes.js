const express = require('express');
const router = express.Router();
const { proteger } = require('../middlewares/auth');
const {
  registrar,
  login,
  getPerfil,
  atualizarPerfil
} = require('../controllers/authController');

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', proteger, getPerfil);
router.put('/perfil', proteger, atualizarPerfil);

module.exports = router;