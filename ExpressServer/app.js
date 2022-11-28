const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = require('./database.js');
const bodyParser = require('body-parser');

const app = express();
const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('port', process.env.PORT || 4000);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});

app.get('/api/keys', (req, res, next) => {
  const sql = 'select * from keys';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

app.get('/api/key/:key', (req, res, next) => {
  const sql = 'select * from keys where pubKey = ?';
  const params = [req.params.key];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

app.get('/api/VCS', (req, res, next) => {
  const sql = 'select * from VCs';
  const params = [];
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

app.get('/api/VC/:key', (req, res, next) => {
  const sql = 'select * from VCs where pubKey = ?';
  const params = [req.params.key];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

app.post('/api/key/', (req, res, next) => {
  const errors = [];
  console.log(req.body);
  if (!req.body.pubKey) {
    errors.push('No pubkey specified');
  }
  if (!req.body.privKey) {
    errors.push('No privKey specified');
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(',') });
    return;
  }
  const data = {
    pubKey: req.body.pubKey,
    privKey: req.body.privKey,
  };
  const sql = 'INSERT INTO keys (pubKey, privKey) VALUES (?,?)';
  const params = [data.pubKey, data.privKey];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data,
      id: this.lastID,
    });
  });
});

app.post('/api/VC/:key', (req, res, next) => {
  const errors = [];
  if (!req.body.id) {
    errors.push('No ID for VC specified');
  }
  if (!req.body.data) {
    errors.push(`No data for VC with id${req.body.id}`);
  }
  if (!req.params.key) {
    errors.push(`No key specified, can't assign VC${req.body.id}`);
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(',') });
    return;
  }
  const data = {
    pubKey: req.params.key,
    data: req.body.data,
    id: req.body.id,
  };
  const sql = 'INSERT INTO VCs (id, pubKey, data) VALUES (?,?,?)';
  const params = [data.id, data.pubKey, data.data];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data,
      id: this.lastID,
    });
  });
});

app.get('/api/keygen', (req, res, next) => {
  crypto.generateKeyPair(
    'rsa',
    {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        // cipher: 'aes-256-cbc',
        // passphrase: 'top secret'
      },
    },
    (err, publicKey, privateKey) => {
      if (!err) {
        const data = {
          pubKey: publicKey,
          privKey: privateKey,
        };
        // console.log("Public Key = " + publicKey)
        // console.log("Private Key = " + privateKey)
        const sql = 'INSERT INTO keys (pubKey, privKey) VALUES (?,?)';
        const params = [data.pubKey, data.privKey];
        db.run(sql, params, function (err, result) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: 'success',
            data,
            id: this.lastID,
          });
        });
      } else {
        console.log(err);
      }
    }
  );
});

app.post('/api/encrypt', (req, res, next) => {
  try {
    const { pubKey } = req.body;
    const message = req.body.data;
    const encryptedData = crypto.publicEncrypt(
      {
        key: pubKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      // We convert the data string to a buffer using `Buffer.from`
      Buffer.from(message)
    );
    console.log(`Encrypted Data: ${encryptedData}`);
    res.status(200).json({ message: 'Success', data: encryptedData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error' });
  }
});

app.post('/api/decrypt', (req, res, next) => {
  try {
    const { privKey } = req.body;
    const message = req.body.data;
    const decryptedData = crypto.privateDecrypt(
      {
        key: privKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      message
    );

    console.log('decrypted data: ', decryptedData.toString());
    res.status(200).json({ message: 'Success', data: decryptedData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error' });
  }
});

app.post('/api/sign', (req, res, next) => {
  try {
    const { privKey } = req.body;
    const message = req.body.data;

    const signer = crypto.createSign('RSA-SHA256');
    signer.write(message);
    signer.end();

    // Returns the signature in output_format which can be 'binary', 'hex' or 'base64'
    const signature = signer.sign(privKey, 'base64');

    console.log('Digital Signature: ', signature);
    res.status(200).json({ message: 'Success', data: signature });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error' });
  }
});

app.post('/api/verify', (req, res, next) => {
  try {
    const { pubKey } = req.body;
    const { signature } = req.body.data;
    const { message } = req.body.data;

    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.write(message);
    verifier.end();

    // Verify file signature ( support formats 'binary', 'hex' or 'base64')
    const result = verifier.verify(pubKey, signature, 'base64');

    console.log(`Digital Signature Verification : ${result}`);
    res.status(200).json({
      message: `Success: The verification outcome is - ${result}`,
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error' });
  }
});

app.post('/api/getVCs', async (req, res, next) => {
  try {
    const data = JSON.stringify({
      username: req.body.username,
      password: req.body.password,
    });

    const config = {
      method: 'post',
      url: 'UNDEFINED AT MOMENT',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = await axios(config);
    res
      .status(200)
      .json({ message: 'Success', data: JSON.stringify(response) });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error' });
  }
});

app.post('/api/uploadVC', async (req, res, next) => {
  try {
    // CREATE REQUEST TO ENCRYPT VC
    const { vc } = req.body;
    var data = JSON.stringify({
      vc,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const encryptedVC = await axios(config);

    // CREATE REQUEST TO SEND A VC TO A VERIFIER
    var data = JSON.stringify({
      encryptedVC,
    });

    var config = {
      method: 'post',
      url: 'UNDEFINED AT MOMENT',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = await axios(config);
    res
      .status(200)
      .json({ message: 'Success', data: JSON.stringify(response) });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error' });
  }
});

/*
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
*/
