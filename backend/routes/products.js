const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../utils/db');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to handle JSON requests and CORS
app.use(express.json());
app.use(cors());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append current timestamp to avoid duplicate filenames
  }
});
const upload = multer({ storage: storage });

// Define routes
const router = express.Router();

// Route to add products
router.post('/add-products', upload.single('img'), (req, res) => {
  // Validate if file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }

  // Extract product data from the request body
  const { name, description, amt, category, delivery_date, discount, ratings } = req.body;
  const img = req.file ? req.file.path.replace(/\\/g, '/') : null; // Save relative path to the database

  // Validate required fields
  if (!name || !description || !amt || isNaN(amt)) {
    return res.status(400).json({ message: 'Invalid input data. Ensure all fields are correct.' });
  }

  // SQL query to insert the product into the database
  const query = 'INSERT INTO products (img, name, description, amt, category, delivery_date, discount, ratings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(
    query,
    [img, name, description, amt, category, delivery_date, discount || 0, ratings || 0],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Error saving product to the database' });
      }
      res.json({ message: 'Product added successfully', productId: results.insertId });
    }
  );
});

// Route to list products
router.get('/list-products', (req, res) => {
  const query = 'SELECT * FROM products ORDER BY id DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error fetching products from the database' });
    }
    res.json(results);
  });
});

router.post('/cart', (req, res) => {
  const { name } = req.body;
console.log("name ",name)
  // Check if the product is already in the cart
  const checkQuery = 'SELECT * FROM products WHERE name = ?';
  db.query(checkQuery, [name], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error checking product in cart' });
    }

    if (results.length > 0) {
      const product = results[0];

      if (product.cart === 1) {
        return res.status(400).json({ message: 'Product already in cart' });
      } else {
        // Update the product's cart value to 1 (added to cart)
        const updateQuery = 'UPDATE products SET cart = 1 WHERE name = ?';
        db.query(updateQuery, [name], (updateErr) => {
          if (updateErr) {
            console.error('Error updating cart:', updateErr);
            return res.status(500).json({ message: 'Error adding product to cart' });
          }
          res.json({ message: 'Product added to cart' });
        });
      }
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});


// Route to debug uploaded files in the uploads directory
router.get('/debug-uploads', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      return res.status(500).send('Error reading uploads directory');
    }
    res.json(files);
  });
});

// Export the routes module
module.exports = router;

// Start the server (included in the main server file)
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
