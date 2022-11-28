/* eslint-disable promise/always-return */
/* eslint-disable no-console */

import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
  useHistory,
  useNavigate,
  Routes,
  Route,
  Outlet,
  Link,
  Navigate,
} from 'react-router-dom';

import {
  Grid,
  Box,
  CardMedia,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
} from '@mui/material';

import axios from 'axios';
import { title } from 'process';
import SignCredentials from './SignCredentials';

var axios = require('axios');

const MyCredentials = () => {
  const [credentials, setCredentials] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await axios.get('http://localhost:4000/api/VCs');
    console.log(JSON.stringify(data.data.data));
    setCredentials(data.data.data);
  };

  return (
    <div>
      <Grid alignItems="center">
        {Array.isArray(credentials)
          ? credentials.map((creds) => (
              <Grid item key={creds.id} xs={9} lg={6} variant="scrollable">
                <Card variant="outlined">
                  <Box style={{ maxHeight: '100vh', overflow: 'auto' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {creds.id}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Public Key: {creds.pubKey}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Data: {creds.data}
                      </Typography>
                      <Button>sign</Button>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
};



export default MyCredentials;
