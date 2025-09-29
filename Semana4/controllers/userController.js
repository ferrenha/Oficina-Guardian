const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password are required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);


    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [username, hashedPassword, 'user']
    );
    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '1h' }
    );

    return res.json({ token, id: user.id, username: user.username, role: user.role });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password are required' });

  try {
    const result = await pool.query('SELECT id, username, password, role FROM users WHERE username=$1', [username]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '1h' }
    );

    return res.json({ token, id: user.id, username: user.username, role: user.role });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, role FROM users');
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


const getMe = (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  return res.json({ ok: true });
};

module.exports = { registerUser, loginUser, getUsers, getMe };
