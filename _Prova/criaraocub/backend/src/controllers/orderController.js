const Order = require('../models/Order');

// Criar novo pedido
const createOrder = async (req, res) => {
  try {
    const { description, fileUrl } = req.body;
    
    const order = await Order.create({
      user: req.user.id,
      description,
      fileUrl,
      status: 'pending'
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar pedidos do usuário
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os pedidos (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar pedido (admin)
const updateOrder = async (req, res) => {
  try {
    const { status, amount, message } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    order.status = status || order.status;
    if (amount) order.quote.amount = amount;
    if (message) order.quote.message = message;
    order.updatedAt = Date.now();

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrder };