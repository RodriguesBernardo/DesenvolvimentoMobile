const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');

// Criar uma nova notícia
router.post('/', async (req, res) => {
  const { titulo, conteudo } = req.body;

  try {
    const noticia = new Noticia({ titulo, conteudo });
    await noticia.save();
    res.json(noticia);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar notícia' });
  }
});

// Listar todas as notícias
router.get('/', async (req, res) => {
  try {
    const noticias = await Noticia.find().sort({ createdAt: -1 });
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
});

module.exports = router;
