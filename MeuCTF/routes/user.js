const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, getMe } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

// Endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/me', authenticateToken, getMe);

// Admin-only endpoint: retorna a flag diretamente (sem arquivo)
router.get('/admin', authenticateToken, (req, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: admin only' });
  }
  const flag = process.env.FLAG1 || 'GUARDIAN{stage1_jwt_token_decoded_admin}';
  return res.json({ flag });
});

module.exports = router;
