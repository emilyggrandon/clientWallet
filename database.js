const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DBSOURCE = 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE keys (
            pubKey text PRIMARY KEY,
            privKey text
            )`,
      (err) => {
        if (err) {
          // Table already created
          console.log(err);
        } else {
          // Table just created, creating some rows
          const insert = 'INSERT INTO keys (pubKey, privKey) VALUES (?,?)';
          db.run(insert, ['123456789', '987654321']);
        }
      }
    );
    db.run(
      `CREATE TABLE VCs (
            id text PRIMARY KEY,
            pubKey text,
            data text,
            FOREIGN KEY(pubKey) REFERENCES keys(pubKey)
            )`,
      (err) => {
        if (err) {
          console.log(err);
        } else {
          // Table just created, creating some rows
          const insert = 'INSERT INTO VCs (id, pubKey, data) VALUES (?,?,?)';
          db.run(insert, ['VC123', '123456789', 'thisisdata']);
        }
      }
    );
  }
});

module.exports = db;
