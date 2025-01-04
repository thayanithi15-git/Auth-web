const express = require('express')
const dotenv = require('dotenv')


const app = express()
dotenv.config()
app.use(express.json())

const PORT = process.env.DB_PORT;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = results[0];
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful.', user: { id: user.id, email: user.email } });
    });
});


app.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`)
})