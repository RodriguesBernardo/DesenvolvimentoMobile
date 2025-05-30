const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const user = await User.create({ nome, email, senha: hashedPassword, tipo });
    res.status(201).json({ msg: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(400).json({ msg: "Erro ao registrar", erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(senha, user.senha)))
    return res.status(401).json({ msg: "Credenciais inválidas" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { nome: user.nome, email: user.email, tipo: user.tipo } });
};
