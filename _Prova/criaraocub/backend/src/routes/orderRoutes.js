const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrder 
} = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getUserOrders);
router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id', authMiddleware, adminMiddleware, updateOrder);

module.exports = router;