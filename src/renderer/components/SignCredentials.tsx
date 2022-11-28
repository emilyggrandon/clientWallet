import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useHistory, useNavigate, useLocation, useParams } from 'react-router-dom';

import {
  Grid,
  Box,
  CardMedia,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  Link,
} from '@mui/material';
import axios from 'axios';

var axios = require('axios');

const SignCredentials = (props) => {
  const params = useLocation();
  const { id } = useParams();

  useEffect(() => {
    console.log(`We are in the right place`);
  }, []);
  return (
    <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
      <Paper>
        <Typography>SIGN CREDS 123</Typography>
      </Paper>
    </div>
  );
};

export default SignCredentials;
