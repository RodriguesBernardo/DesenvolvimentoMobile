const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Adicione esta linha para importar o módulo fs

const uploadDir = 'uploads/orcamentos';

// Verificar e criar o diretório se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/octet-stream' || 
      file.originalname.toLowerCase().endsWith('.stl')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos STL são permitidos'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

module.exports = upload;