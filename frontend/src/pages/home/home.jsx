import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Badge,
  Divider,
  Dialog,
  DialogActions,
  Select,
  InputLabel,
  MenuItem,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Add, AddAPhoto, AddAPhotoOutlined, AddBox, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Products from '../../components/products';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [form, setForm] = useState(false);

  

  const handleFormClose = () => {
    setForm(false);
  }

  return (
    <>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 1 }}>
          <Container>
            <Typography variant="body2" align="center">
              Free shipping on orders over $50! Limited time offer
            </Typography>
          </Container>
        </Box>

        <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Left section */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isMobile && (
                  <IconButton edge="start" color="inherit">
                    <MenuIcon />
                  </IconButton>
                )}
                <Typography variant="h6" component="h1" sx={{ color: 'primary.main', ml: 2, fontWeight: 700 }}>
                  ShopStyle
                </Typography>
              </Box>

              {/* Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 4 }}>
                  {['Home', 'Shop', 'Categories', 'Deals'].map((item) => (
                    <Button
                      key={item}
                      color="inherit"
                      sx={{ textTransform: 'none' }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Icons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <IconButton color="inherit">
                  <PersonIcon />
                </IconButton>
                <IconButton color="inherit">
                  <FavoriteIcon />
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={3} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", gap: 1, cursor: "pointer", color: "red" }} onClick={() => navigate('/signin')}>
                <Box>Logout</Box>
                <Logout />
              </Box>
            </Container>
          </Toolbar>
        </AppBar>

        <Box sx={{ background: 'linear-gradient(to right, #1976D2, #FFFFFF)', color: 'common.white', py: 12 }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 'md' }}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                New Summer Collection
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
                Discover the latest trends and styles for your wardrobe
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Container>
        </Box>

        <Container sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
            Shop by Category
          </Typography>
          <Grid container spacing={4}>
            {['Women', 'Men', 'Accessories'].map((category) => (
              <Grid item xs={12} md={4} key={category}>
                <Paper
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    height: 200
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      p: 3
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                      {category}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ textTransform: 'none' }}
                    >
                      View All
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container sx={{ py: 8 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{}}>
              Featured Products
            </Typography>
            <Button sx={{ display: "flex", gap: 1, cursor: "pointer", backgroundColor: "primary.main", color: 'white', padding: '0.8% 2%' }} onClick={() => setForm(true)}>
              <Box>ADD ITEMS</Box>
              <AddBox />
            </Button>
          </Box>
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="div"
                    sx={{ height: 200, bgcolor: 'grey.200' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      Product Name
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      $99.99
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2, textTransform: 'none' }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'common.white', py: 6, mt: 8 }}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Your one-stop shop for all fashion needs.
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom>
                  Customer Service
                </Typography>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                  {['Contact Us', 'Shipping Policy', 'Returns & Exchanges', 'FAQ'].map((item) => (
                    <Typography
                      key={item}
                      component="li"
                      variant="body2"
                      color="grey.400"
                      sx={{ mb: 1, cursor: 'pointer' }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom>
                  Quick Links
                </Typography>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                  {['Shop', 'Categories', 'New Arrivals', 'Sale'].map((item) => (
                    <Typography
                      key={item}
                      component="li"
                      variant="body2"
                      color="grey.400"
                      sx={{ mb: 1, cursor: 'pointer' }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom>
                  Newsletter
                </Typography>
                <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
                  Subscribe to get special offers and updates.
                </Typography>
                <Paper
                  component="form"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter your email"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: '0 4px 4px 0',
                      textTransform: 'none'
                    }}
                  >
                    Subscribe
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Dialog open={form} onClose={() => setForm(false)} fullWidth maxWidth="sm">
          <Products handleFormClose={handleFormClose} />
        </Dialog>
      </Box>
      
    </>
  );
}