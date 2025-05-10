import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Mail,
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  GitHub,
  LinkedIn
} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [check, setCheck] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }

    const emailValidationRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidationRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

    if (!emailValidationRegex.test(email)) {
      return toast.error("Invalid email address");
    }

    // if (!passwordValidationRegex.test(password)) {
    //   return toast.error(
    //     "Password must be 8 characters with uppercase, lowercase, number, and special character"
    //   );
    // }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!check) {
      return toast.error("Please agree to terms and conditions");
    }

    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        name,
        email,
        password,
      } , {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCheck(false);
        toast.success("Account created successfully");

      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      toast.error("Failed to create account error");
    }
  };

return (
  <>
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6B46C1 0%, #2563EB 100%)',
        // py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2, sm: 2 },
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
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
                width: 60,
                height: 60,
                bgcolor: 'primary.main',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                transform: 'scale(1.2)'
              }}
            >
              <Person sx={{ fontSize: 32 }} />
            </Avatar>

            <Typography
              component="h1"
              variant={isMobile ? 'h5' : 'h4'}
              fontWeight="bold"
              color="primary"
              textAlign="center"
            >
              Create Account
            </Typography>

            <Box
              component="form"
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5
              }}
            >
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                placeholder='Confirm your password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox color="primary" onChange={(event) => setCheck(event.target.checked)} />}
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to the{' '}
                    <Button
                      sx={{
                        p: 0,
                        textTransform: 'none',
                        verticalAlign: 'baseline',
                        fontSize: 'inherit',
                        fontWeight: 600
                      }}
                    >
                      Terms of Service
                    </Button>{' '}
                    and{' '}
                    <Button
                      sx={{
                        p: 0,
                        textTransform: 'none',
                        verticalAlign: 'baseline',
                        fontSize: 'inherit',
                        fontWeight: 600
                      }}
                    >
                      Privacy Policy
                    </Button>
                  </Typography>
                }
              />

              <Button
                onClick={handleCreateAccount}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  backgroundImage: 'linear-gradient(135deg, #6B46C1 0%, #2563EB 100%)',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(135deg, #5B35B1 0%, #1D4ED8 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.25)'
                  }
                }}
              >
                Create Account
              </Button>

              {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography color="text.secondary" variant="body2">
                  OR
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box> */}

              {/* <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  flexWrap: 'wrap'
                }}
              >
                {[
                  { icon: <Google />, color: '#DB4437', hover: '#C53829' },
                  { icon: <GitHub />, color: '#333', hover: '#24292E' },
                  { icon: <LinkedIn />, color: '#0077B5', hover: '#006399' }
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      bgcolor: social.color,
                      color: 'white',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: social.hover,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box> */}

              <Typography
                textAlign="center"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                Already have an account?{' '}
                <Button
                  onClick={() => navigate('/signin')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 'inherit'
                  }}
                >
                  Sign In
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

export default SignUp;