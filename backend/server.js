const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.DB_PORT

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('Connection Done!!')
    }
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Enter email or password' });
    }

    const query = 'SELECT * FROM login WHERE email = ? and password = ?';

    db.query(query, [email, password], (err, result) => { 
        if (err) {
            return res.status(500).json({ error: 'Internal Error' });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: 'Login Successful' });
        } else {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }
    });
});


app.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`)
})