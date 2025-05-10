import { AddAPhotoOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products({ handleFormClose , handleSubmitted}) {

    const [product, setProduct] = useState({
        name: '',
        description: '',
        amt: '',
        category: '',
        delivery_date: '',
        discount: '',
        ratings: '',
    });

    const [imageFile, setImageFile] = useState(null); // Store the actual file for upload

  const categories = ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file
      setProduct((prev) => ({ ...prev, image: URL.createObjectURL(file) })); // Preview image
    }
  };

  const handleSubmit = async () => {
    console.log('Product Details:', product);

    const formData = new FormData();
    formData.append('img', imageFile); // Pass the file
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('amt', product.amt);
    formData.append('category', product.category);
    formData.append('delivery_date', product.delivery_date);
    formData.append('discount', product.discount || 0);
    formData.append('ratings', product.ratings || 0);

    try {
        const response = await axios.post('http://localhost:8080/api/add-products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            toast.success('Product added successfully!');
            handleFormClose(); // Close the form on success
        } else {
            toast.error('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product. Please try again.');
    }
    handleSubmitted()
};



    return (
        <>
            <Box>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 0 }}
                    >
                        {/* Image Upload */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton component="label">
                                <Avatar
                                    src={product.image}
                                    sx={{ width: 80, height: 80, cursor: 'pointer' }}
                                >
                                    <AddAPhotoOutlined />
                                </Avatar>
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    name='img'
                                    onChange={handleImageUpload}
                                />
                            </IconButton>
                            <TextField
                                label="Product Name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Box>

                        {/* Description */}
                        <TextField
                            label="Description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />

                        {/* Grid for Fields */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField

                                    label="Price"
                                    name="amt"
                                    value={product.price}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category-select"
                                        name="category"
                                        value={product.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        {categories.map((category, index) => (
                                            <MenuItem key={index} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Delivery Date"
                                    name="delivery_date"
                                    value={product.delivery_date}
                                    onChange={handleChange}
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Discount (%)"
                                    name="discount"
                                    value={product.discount}
                                    onChange={handleChange}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Ratings (1-5)"
                                    name="ratings"
                                    value={product.ratings}
                                    onChange={handleChange}
                                    type="number"
                                    inputProps={{ min: 0, max: 5 }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: "5% 4%", gap: 1 }}>
                    <Button onClick={handleFormClose} sx={{ color: 'grey' }}>
                        Discard
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Add Product
                    </Button>
                </DialogActions>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition={Bounce}
            />
        </>
    )
}

export default Products;