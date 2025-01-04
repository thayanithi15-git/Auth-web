const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.DB_PORT;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter both email and password' });
    }

    const query = "SELECT * FROM login WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal error" });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: 'Found data' });
        } else {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }
    });
});

// In-memory store for simplicity (use a database in production)
const resetCodeStore = {};

app.post('/api/verify-email', (req, res) => {
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


app.post('/api/send-reset-code', (req, res) => {
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
        resetCodeStore[email] = resetCode; // Store the reset code against the email

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'thayanithi2006s@gmail.com',
                pass: 'vevf wmqi ihhl ijtw',
            },
        });

        const mailOptions = {
            from: 'thayanithi2006s@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Your password reset code is: ${resetCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred while sending email:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to send reset code. Please try again later.',
                    error: error.message,
                });
            }
            res.json({ success: true, message: 'Reset code sent successfully' });
        });
    });
});

app.post('/api/submit-reset-code', (req, res) => {
    const { email, resetCode } = req.body;

    if (!email || !resetCode) {
        return res.status(400).json({ success: false, message: 'Email and reset code are required' });
    }

    const storedCode = resetCodeStore[email];
    if (!storedCode || parseInt(resetCode, 10) !== storedCode) {
        return res.status(400).json({ success: false, message: 'Invalid or expired reset code' });
    }

    // Optionally, clear the reset code after verification
    delete resetCodeStore[email];

    res.json({ success: true, message: 'Reset code verified successfully' });
});


app.post("/api/reset-password", (req, res) => {
    const { email, password, confirmPassword } = req.body;
  
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }
  
    const query = "UPDATE login SET password = ? WHERE email = ?";
    db.query(query, [password, email], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Email not found in the system" });
      }
  
      res.status(200).json({ success: true, message: "Password reset successfully" });
    });
  });
  
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
