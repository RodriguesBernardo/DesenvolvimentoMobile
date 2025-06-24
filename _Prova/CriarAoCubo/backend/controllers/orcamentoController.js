const Orcamento = require('../models/Orcamento');
const fs = require('fs');
const path = require('path');

// @desc    Enviar arquivo para orçamento
// @route   POST /api/orcamentos
// @access  Private
const enviarOrcamento = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensagem: 'Nenhum arquivo foi recebido' });
    }

    // Verificar se o arquivo foi realmente salvo
    if (!fs.existsSync(req.file.path)) {
      throw new Error('Arquivo não foi salvo corretamente');
    }

    // Usar caminho relativo para armazenar no banco de dados
    const relativePath = path.relative(process.cwd(), req.file.path);

    const orcamento = await Orcamento.create({
      usuario: req.usuario._id,
      arquivo: relativePath, // Armazena caminho relativo
      nomeArquivo: req.file.originalname
    });

    res.status(201).json(orcamento);
  } catch (error) {
    console.error('Erro no servidor:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ mensagem: 'Erro ao processar o arquivo' });
  }
};

// @desc    Obter orçamentos do usuário
// @route   GET /api/orcamentos/meus-orcamentos
// @access  Private
const obterMeusOrcamentos = async (req, res) => {
  try {
    const orcamentos = await Orcamento.find({ usuario: req.usuario._id })
      .sort('-dataEnvio')
      .populate('usuario', 'nome email')
      .select('-arquivo'); // Exclui o campo do arquivo binário
      
    res.json(orcamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao obter orçamentos' });
  }
};

// @desc    Obter todos os orçamentos (admin)
// @route   GET /api/orcamentos
// @access  Private/Admin
const obterTodosOrcamentos = async (req, res) => {
  try {
    const orcamentos = await Orcamento.find({})
      .sort('-dataEnvio')
      .populate('usuario', 'nome email');
    
    res.json(orcamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao obter orçamentos' });
  }
};

// @desc    Atualizar orçamento (admin)
// @route   PUT /api/orcamentos/:id
// @access  Private/Admin
const atualizarOrcamento = async (req, res) => {
  try {
    const { valor, observacoes, status } = req.body;
    
    const orcamento = await Orcamento.findById(req.params.id);
    
    if (!orcamento) {
      return res.status(404).json({ mensagem: 'Orçamento não encontrado' });
    }
    
    // Apenas admin pode definir o valor
    if (req.usuario.isAdmin) {
      orcamento.valor = valor !== undefined ? valor : orcamento.valor;
    }
    
    // Apenas admin pode atualizar status e observações
    if (req.usuario.isAdmin) {
      orcamento.observacoes = observacoes || orcamento.observacoes;
      orcamento.status = status || orcamento.status;
      orcamento.dataResposta = Date.now();
    }
    
    const orcamentoAtualizado = await orcamento.save();
    
    res.json(orcamentoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar orçamento' });
  }
};

// @desc    Baixar arquivo STL
// @route   GET /api/orcamentos/:id/download
// @access  Private
const baixarArquivo = async (req, res) => {
  try {
    const orcamento = await Orcamento.findById(req.params.id);
    
    if (!orcamento) {
      return res.status(404).json({ mensagem: 'Orçamento não encontrado' });
    }
    
    // Verificar se o usuário é o dono ou admin
    if (orcamento.usuario.toString() !== req.usuario._id.toString() && !req.usuario.isAdmin) {
      return res.status(403).json({ mensagem: 'Não autorizado' });
    }
    
    if (!fs.existsSync(orcamento.arquivo)) {
      return res.status(404).json({ mensagem: 'Arquivo não encontrado' });
    }
    
    res.download(orcamento.arquivo, orcamento.nomeArquivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao baixar arquivo' });
  }
};

module.exports = {
  enviarOrcamento,
  obterMeusOrcamentos,
  obterTodosOrcamentos,
  atualizarOrcamento,
  baixarArquivo
};