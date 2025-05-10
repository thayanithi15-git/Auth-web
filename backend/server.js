const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/auth');
const resetRoutes = require('./routes/reset');
const signupRoutes = require('./routes/signup');
const productsRoutes = require('./routes/products');

const app = express();

// Serve static files (uploads) before other routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api', authRoutes);
app.use('/api', resetRoutes);
app.use('/api', signupRoutes);
app.use('/api', productsRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
