const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/upload', authMiddleware, uploadFile);

module.exports = router;