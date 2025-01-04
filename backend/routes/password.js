const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.post('/reset-password', (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  const query = 'UPDATE login SET password = ? WHERE email = ?';
  db.query(query, [password, email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Email not found in the system' });
    }

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  });
});

module.exports = router;
