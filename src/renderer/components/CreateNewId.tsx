import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress } from '@mui/material';

import axios from 'axios';

const CreateNewId = () => {
  const [myPubKey, setPubKey] = useState('Error: No Public Key Made');
  const [myPrivKey, setPrivKey] = useState('Error: No Private Key Made');
  const [myDid, setDid] = useState('Error: No Did Created');

  useEffect(() => {
    const getKeys = async () => {
      const config = {
        method: 'get',
        url: 'http://localhost:4000/api/keygen',
        headers: {},
      };
      const response = await axios(config);
      const myKeyData = response.data.data;
      setPubKey(myKeyData.pubKey);
      setPrivKey(myKeyData.privKey);
    };
    const getDid = async () => {
      var data = JSON.stringify({
        "chaincode": "{{bc-chaincode-name}}",
        "args": [
          "CreateDidDocument",
         {myPubKey}
        ],
        "sync": true
      });

      var config = {
        method: 'post',
        url: 'https://test1-oracleoncampus-iad.blockchain.ocp.oraclecloud.com:7443/restproxy/api/v2/channels/ram322/transactions',
        headers: {
          'Authorization': 'Basic YWdrNDIzQGxlaGlnaC5lZHU6RW1tZXR0ODY0MiEh',
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log(data);

    }


    getKeys();
    getDid();


  }, []);

  return (
    <div style={{paddingLeft : '70px', paddingRight: '70px'}}>
    <Paper>
      <Typography>hello</Typography>
      <Typography>{myPubKey}</Typography>
      <br />
      <Typography>{myPrivKey}</Typography>
    </Paper>
    </div>
  );
};

export default CreateNewId;
