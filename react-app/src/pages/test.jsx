import { Link, Stack, Typography } from '@mui/material'
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  window.location.href = (process.env.REACT_APP_API_URL || '') + '/auth/google'
}

export default Login