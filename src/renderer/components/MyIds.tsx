/* eslint-disable promise/always-return */
/* eslint-disable no-console */

import { useEffect, useState } from 'react';

import {Grid, Box, Typography, Card, CardContent, Paper} from '@mui/material';

import axios from 'axios';

var axios = require('axios');
;
var myData = []
var myArrayData = []
const MyIds = () => {
  const [myKey, getMyKey] = useState([])
  const getKeyData = async () => {
    try {
      const data = await axios.get('http://localhost:4000/api/keys');
      console.log(data.data.data)
      myData = (data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    getKeyData();
  })


  return (
    <div style={{paddingLeft : '70px', paddingRight: '70px'}}>
      <Card>
      <CardContent>
          <Typography>DID INFO GOES HERE</Typography>
      </CardContent>
      </Card>
    </div>

  );
};

export default MyIds;

{/*

The Mapping should eventually look something like thisbut it doesnt seem to work....


{didExample.map((didDocs) => (
    <Grid item key={didDocs.key} xs={9} lg={6} variant="scrollable">
      <Card variant="outlined">
        <Box style={{ maxHeight: '100vh', overflow: 'auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {didDocs.did}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is where more info will go pertaining to each instance
              of the DID
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  ))}*/ }
