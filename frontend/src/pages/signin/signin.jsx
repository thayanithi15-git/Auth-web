import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  Mail,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  GitHub,
  LinkedIn
} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/signin', {
        email,
        password
      })

      if(response.status == 200){
        toast.success('Login Successfull');
        navigate('/home');
      }
    }
    catch (err){
      setTimeout(() => {
        if(err.response){  
          toast.error('Invalid Credentials');
        }
        else{
          toast.error('Network Error');
        }
        setLoading(false)
      }, 1000)
    }

 }

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >

        <Container maxWidth="sm">
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
              }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.main',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <Lock />
              </Avatar>

              <Typography
                component="h1"
                variant={isMobile ? 'h5' : 'h4'}
                fontWeight="bold"
                color="primary"
                textAlign="center"
              >
                Welcome Back
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5
                }}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail color="action" />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />


                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    onClick={() => navigate('/forgot-password')}
                    sx={{ textTransform: 'none' }}
                  >
                    Forgot password?
                  </Button>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                  <Divider sx={{ flex: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    OR
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    flexWrap: 'wrap'
                  }}
                >
                  {[{ icon: <Google />, color: '#DB4437' }, { icon: <GitHub />, color: '#333' }, { icon: <LinkedIn />, color: '#0077B5' }].map(
                    (social, index) => (
                      <IconButton
                        key={index}
                        sx={{
                          bgcolor: social.color,
                          color: 'white',
                          '&:hover': {
                            bgcolor: social.color,
                            opacity: 0.9,
                            transform: 'translateY(-2px)'
                          },
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    )
                  )}
                </Box>

                <Typography
                  textAlign="center"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Don't have an account?{' '}
                  <Button
                    onClick={() => navigate('/signup')}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: 'inherit'
                    }}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>


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
  );
};

export default SignIn;
