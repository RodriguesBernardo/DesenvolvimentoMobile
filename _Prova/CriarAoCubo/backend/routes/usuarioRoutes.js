const express = require('express');
const router = express.Router();
const { proteger } = require('../middlewares/auth');
const { obterPerfil } = require('../controllers/usuarioController');

router.get('/perfil', proteger, obterPerfil);

module.exports = router;