import { Link, Typography } from '@material-ui/core';
import React from 'react';

export const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      FlatMate
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
