// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Compare error' });
      if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,          
        sameSite: 'lax',        
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      });

      res.json({ success: true, message: 'Login successful' });
    });
  });
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/'
  });
  res.json({ success: true, message: 'Logout successful' });
});


router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    res.json({ user: { id: payload.id, username: payload.username } });
  });
});

export default router;
