const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const resetRoutes = require('./routes/reset');
const signupRoutes = require('./routes/signup');

const productsRoutes = require('./routes/products');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', resetRoutes);
app.use('/api', signupRoutes);

app.use('/api', productsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
