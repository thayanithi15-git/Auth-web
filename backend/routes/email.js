const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const mailer = require('../utils/mailer');
const crypto = require('crypto');

// In-memory store for simplicity
const resetCodeStore = {};

router.post('/verify-email', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const query = 'SELECT email FROM login WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Email not found in the system' });
    }

    res.json({ success: true, message: 'Email exists in the system' });
  });
});

router.post('/send-reset-code', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const query = 'SELECT email FROM login WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: 'Email not found in the system' });
    }

    const resetCode = crypto.randomInt(100000, 999999);
    resetCodeStore[email] = resetCode;

    mailer.sendResetCode(email, resetCode, (error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Failed to send reset code. Please try again later.',
        });
      }
      res.json({ success: true, message: 'Reset code sent successfully' });
    });
  });
});

router.post('/submit-reset-code', (req, res) => {
  const { email, resetCode } = req.body;

  if (!email || !resetCode) {
    return res.status(400).json({ success: false, message: 'Email and reset code are required' });
  }

  const storedCode = resetCodeStore[email];
  if (!storedCode || parseInt(resetCode, 10) !== storedCode) {
    return res.status(400).json({ success: false, message: 'Invalid or expired reset code' });
  }

  delete resetCodeStore[email];
  res.json({ success: true, message: 'Reset code verified successfully' });
});

module.exports = router;
