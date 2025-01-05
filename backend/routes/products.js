const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../utils/db'); // Ensure your MySQL connection is set up correctly

const router = express.Router();

// Set up the uploads directory
const uploadDir = path.join(__dirname, '..', 'uploads');

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Uploads directory created at: ${uploadDir}`);
  } catch (err) {
    console.error(`Failed to create uploads directory: ${err.message}`);
    process.exit(1); // Exit if the directory cannot be created
  }
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to the uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname); // Add timestamp to avoid conflicts
    cb(null, uniqueName);
  },
});

// Initialize Multer with file size and type validation
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      console.error('File rejected:', file.originalname, file.mimetype);
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Handle the POST request to add products
router.post('/add-products', upload.single('img'), (req, res) => {
  // Validate if file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }

  const { name, description, amt, category, delivery_date, discount, ratings } = req.body;
  const img = `uploads/${req.file.filename}`; // Save relative path to the database

  // Validate required fields
  if (!name || !description || !amt || isNaN(amt)) {
    return res.status(400).json({ message: 'Invalid input data. Ensure all fields are correct.' });
  }

  // SQL query to insert the product into the database
  const query =
    'INSERT INTO products (img, name, description, amt, category, delivery_date, discount, ratings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

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

// Global error handler for multer and other errors
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
  next();
});

module.exports = router;
