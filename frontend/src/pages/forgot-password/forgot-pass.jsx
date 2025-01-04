import React from 'react';
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
  Avatar
} from '@mui/material';
import { Mail, ArrowLeft } from '@mui/icons-material';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '97.5vh',
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
              <TextField
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

              <Button
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
                Send Reset Link
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
  );
};

export default ForgotPassword;