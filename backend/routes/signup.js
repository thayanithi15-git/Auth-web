const express = require('express');
const db = require('../utils/db');

const router = express.Router();

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const query = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(200).json({ message: 'User created successfully' });
    });
});

module.exports = router;
