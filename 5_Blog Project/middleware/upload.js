const multer = require('multer');
const path = require('path');

const imagesDir = path.join(__dirname, '../../public/images');

const storage = multer.diskStorage({
  destination: imagesDir,
  filename: (req, file, cb) => {
    const ts = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `post_${ts}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  const ok = /image\/(png|jpe?g|webp|gif)/i.test(file.mimetype);
  cb(ok ? null : new Error('Only image files are allowed'), ok);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

module.exports = { uploadSingleImage: upload.single('image') };
