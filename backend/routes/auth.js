const express = require('express');
const db = require('../utils/db');

const router = express.Router();

router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter both email and password' });
    }

    const query = 'SELECT * FROM login WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: 'Found data' });
        } else {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }
    });
});

module.exports = router;
