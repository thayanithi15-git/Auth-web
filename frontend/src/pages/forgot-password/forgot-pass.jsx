import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Avatar,
  CircularProgress
} from '@mui/material';
import { Mail, ArrowLeft, Numbers, Phone, PhoneAndroid, Code, ResetTv, Security, SafetyCheck, SafetyCheckOutlined, Pin, Password } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [reset, setReset] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [resetVerify, setResetVerify] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmitReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!resetCode) {
        return toast.error('Enter the reset code');
    }

    try {
        const response = await axios.post('http://localhost:8080/api/submit-reset-code', 
        { email, resetCode }, 
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.success) {
            setResetVerify(true);
            setReset(false)
            toast.success('Reset code verified successfully');
        } else {
            toast.error(response.data.message || 'Invalid reset code');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to verify reset code. Please try again.';
        console.error('Error response:', error.response?.data);
        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
};


const handleResetPassword = async () => {
  const passwordValidationRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

  if (!password) {
    toast.error("Password cannot be empty");
    return;
  }

  if (!passwordValidationRegex.test(password)) {
    toast.error(
      "Password must be 8 characters with uppercase, lowercase, number, and special character"
    );
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/api/reset-password", {
      email,
      password,
      confirmPassword,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      toast.success("Password reset successfully!");
      navigate('/signin')
    } else {
      toast.error(response.data.message || "Failed to reset password");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
    console.error("Error response:", error.response?.data);
    toast.error(errorMessage);
  }
};


const handleResetActive = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
        toast.error('Enter an email');
        setLoading(false);
        return;
    }

    try {
        // Verify email existence in the database
        const verifyResponse = await axios.post('http://localhost:8080/api/verify-email', { email }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!verifyResponse.data.success) {
            toast.error('Email not found in the system. Please enter a valid email.');
            setLoading(false);
            return;
        }

        // Email exists, proceed to send the reset code
        const resetResponse = await axios.post('http://localhost:8080/api/send-reset-code', { email }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (resetResponse.data.success) {
            setReset(true); // Enable the reset state
            toast.success(`A reset code has been sent to ${email}`);
        } else {
            toast.error(resetResponse.data.message || 'Something went wrong. Please try again later.');
        }
    } catch (error) {
        // Handle errors from the API
        const errorMessage = error.response?.data?.message || 'Failed to process your request. Please try again later.';
        console.error('Error response:', error.response?.data);
        toast.error(errorMessage);
    } finally {
        setLoading(false); // Stop loading spinner
    }
};



  return (
    <>
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
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
          // py: 4
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
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
                  width: 70,
                  height: 70,
                  bgcolor: 'warning.main',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                  animation: 'pulse 2s infinite'
                }}
              >
                {/* <KeyReset sx={{ fontSize: 35 }} /> */}
              </Avatar>

              <Typography
                component="h1"
                variant={isMobile ? 'h5' : 'h4'}
                fontWeight="bold"
                color="warning.dark"
                textAlign="center"
              >
                Reset Password
              </Typography>

              <Typography
                textAlign="center"
                color="text.secondary"
                sx={{
                  maxWidth: '400px',
                  mb: 2,
                  fontSize: '1.1rem',
                  lineHeight: 1.5
                }}
              >
                Don't worry! It happens. Please enter the email address associated with your account.
              </Typography>

              <Box
                component="form"
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >

                {!resetVerify ? (
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    required
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'warning.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'warning.main',
                        },
                      }
                    }}
                  />

                ) : (
                  <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                  }}>
                    <TextField
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      label="New Password"
                      variant="outlined"
                      placeholder='Enter a new password'
                      required
                      type="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Password color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: 'warning.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'warning.main',
                          },
                        }
                      }}
                    />
                    <TextField
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      fullWidth
                      label="Confirm New Password"
                      variant="outlined"
                      placeholder='Confirm your password'
                      required
                      type="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Password color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: 'warning.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'warning.main',
                          },
                        }
                      }}
                    />
                  </Box>
                )}

                {reset && !resetVerify ? (
                  <TextField
                    onChange={(e) => setResetCode(e.target.value)}
                    fullWidth
                    label="Reset Code"
                    variant="outlined"
                    required
                    placeholder='Enter a Reset code'
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Pin color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'warning.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'warning.main',
                        },
                      }
                    }}
                  />
                ) : ''}

                <Button
                  onClick={reset ? handleSubmitReset : resetVerify ? handleResetPassword : handleResetActive}
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.8,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    backgroundImage: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
                    '&:hover': {
                      backgroundImage: 'linear-gradient(135deg, #D97706 0%, #DC2626 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(239, 68, 68, 0.25)'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : reset ? 'Submit Reset code' : resetVerify ? 'Confirm Reset Password' : 'Send Reset Code'}
                </Button>

                <Button
                  onClick={() => navigate('/signin')}
                  startIcon={<ArrowLeft />}
                  sx={{
                    textTransform: 'none',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateX(-2px)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  Back to Sign In
                </Button>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: 'warning.soft',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'warning.light'
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Check your spam folder if you don't receive the reset link within a few minutes.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>

        <style>
          {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
            }
            70% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(245, 158, 11, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
            }
          }
        `}
        </style>
      </Box>
    </>
  );
};

export default ForgotPassword;