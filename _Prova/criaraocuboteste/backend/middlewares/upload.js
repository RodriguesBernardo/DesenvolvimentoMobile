const multer = require('multer');
const path = require('path');
const fs = require('fs');

const pasta = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

const storage = multer.diskStorage({
  destination: pasta,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
module.exports = upload;
