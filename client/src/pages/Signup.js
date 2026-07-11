import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import Copyright from '../components/Elements/Copyright';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#18344A',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '0 10px',
  },
}));

const theme = createTheme();

function Signup(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [pwHelper, setPwHelper] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [checked, setChecked] = useState(false);

  const validEmail = (value) => {
    const normalizedEmail = value.toLowerCase().trim();
    const emailPattern = /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

    if (!emailPattern.test(normalizedEmail)) {
      return false;
    }

    const [localPart, domain] = normalizedEmail.split('@');
    if (!localPart || !domain || localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
      return false;
    }

    const blockedDomains = [
      'mailinator.com',
      '10minutemail.com',
      'tempmail.com',
      'guerrillamail.com',
      'yopmail.com',
      'maildrop.cc',
      'getnada.com',
      'trashmail.com',
      'dispostable.com',
      'mailnesia.com'
    ];

    if (blockedDomains.includes(domain)) {
      return false;
    }

    const blockedPrefixes = ['example', 'test', 'fake', 'invalid', 'localhost', 'noreply', 'no-reply'];
    const domainPrefix = domain.split('.')[0];
    return !blockedPrefixes.includes(domainPrefix);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const email = formState.email.toLowerCase().trim();

    if (!validEmail(email)) {
      setEmailState(false);
      setEmailHelper('Please enter a real-looking email address.');
      return;
    }

    if (formState.password.length < 8) {
      setPasswordState(false);
      setPwHelper('Password must be at least 8 characters.');
      return;
    }

    try {
      const mutationResponse = await addUser({
        variables: {
          email,
          password: formState.password,
        },
      });

      setEmailHelper('');
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (error) {
      const message = error.message || '';
      if (message.toLowerCase().includes('duplicate key') || message.toLowerCase().includes('email already exists')) {
        setEmailState(false);
        setEmailHelper('Email already exists. Please try logging in.');
      } else if (message.toLowerCase().includes('does not appear to accept mail') || message.toLowerCase().includes('could not verify') || message.toLowerCase().includes('valid email address')) {
        setEmailState(false);
        setEmailHelper(message);
      } else {
        setEmailState(false);
        setEmailHelper('Unable to sign up. Please check your email and try again.');
      }
    }
  };

  const handleChangePw = (event) => {
    const { name, value } = event.target;
    if (value.length > 8) {
      setPasswordState(true);
      setPwHelper('');
    } else {
      setPasswordState(false);
      setPwHelper('Password must be at least 8 characters.');
    }
    setPasswordTouched(true);

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleChangeEmail = (event) => {
    const { name, value } = event.target;
    const emailValue = value.toLowerCase();

    if (validEmail(emailValue)) {
      setEmailState(true);
      setEmailHelper('Email looks good!');
    } else {
      setEmailState(false);
      setEmailHelper('Please enter a real-looking email address.');
    }
    setEmailTouched(true);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container className={classes.container}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{
          backgroundColor: 'white', marginTop: { xs: 4, sm: 8 }, marginBottom: { xs: 4, sm: 10 }, px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 4 }, borderRadius: 2, boxShadow: 3,
        }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeEmail}
                error={emailTouched && !emailState}
                helperText={emailTouched ? emailHelper : ''}
                margin="normal"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChangePw}
                error={passwordTouched && !passwordState}
                helperText={passwordTouched ? pwHelper : ''}
              />

              <Link to='/legal'>Terms</Link>

              <FormControlLabel
                control={<Checkbox value="legal" color="primary" />}
                label="I confirm that I have read the legal documents and agree to the terms."
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!(emailState && passwordState && checked)}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </Container>
  )
}
export default Signup;
