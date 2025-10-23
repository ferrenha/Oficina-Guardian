const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const multer = require('multer');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const OUT_DIR = path.join(__dirname, '..', 'public', 'avatars');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });
try {
  fs.chmodSync(UPLOAD_DIR, 0o777);
  fs.chmodSync(OUT_DIR, 0o777);
} catch {}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ok = /\.(png|jpe?g)$/i.test(file.originalname || '');
    if (!ok) return cb(new Error('Somente imagens .png, .jpg, .jpeg'));
    cb(null, true);
  },
  limits: { fileSize: 200 * 1024 }
});


router.post('/avatar', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Somente admin pode alterar o avatar.' });
  }
  if (!req.file) return res.status(400).json({ error: 'Envie um arquivo.' });

  const filename = req.file.filename;
  const inPath = path.join(UPLOAD_DIR, filename);

  const outName = `user-${req.user.id}.png`;
  const outPath = path.join(OUT_DIR, outName);




  const size = (req.query?.size || '300x300').toString();
  const shellQ = (s) => `'${s.replace(/'/g, "'\\''")}'`;

  const cmd = `su ctfuser -s /bin/sh -c "/usr/bin/convert ${shellQ(inPath)} -resize ${size} ${shellQ(outPath)}"`;

  exec(cmd, (err, _stdout, _stderr) => {
    if (err) {
      console.error('convert error:', err && err.message);
      return res.status(500).json({ error: 'Falha ao processar a imagem' });
    }
    return res.json({ ok: true, message: 'Avatar atualizado', file: `/avatars/${outName}?t=${Date.now()}` });
  });
});


module.exports = router;
