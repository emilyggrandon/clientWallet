import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function createData(
  Id: string,
  Owner: string,
  Issuance: string,
  Signed: string,
) {
  return { Id, Owner, Issuance, Signed };
}

const rows = [
  createData('TEST1', 'TEST1', '01/01/23', 'false'),
  createData('TEST2', 'TEST1', '01/01/23', 'false'),
  createData('TEST3', 'TEST1', '01/01/23', 'false'),
  createData('TEST4', 'TEST1', '01/01/23', 'false'),
  createData('TEST5', 'TEST1', '01/01/23', 'false'),
  createData('TEST6', 'TEST1', '01/01/23', 'false'),
  createData('TEST7', 'TEST1', '01/01/23', 'false'),
];

const MyHistory = () => {
  return (
    <div style={{paddingLeft : '50px', paddingRight: '50px'}}>
    <Paper>
      <Typography> History Page</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>
                <Box sx={{ fontWeight: 'bold'}}>Verifiable Credential</Box>
              </Typography>
            </TableCell>
            <TableCell align='right'>
              <Typography>
                <Box sx={{ fontWeight: 'bold'}}>Owner DID</Box>
              </Typography>
            </TableCell>
            <TableCell align='right'>
              <Typography>
                <Box sx={{fontWeight: 'bold'}}>Date Issued</Box>
              </Typography>
            </TableCell>
            <TableCell align='right'>
              <Typography>
                <Box sx={{ fontWeight: 'bold', m: 1 }}>Signed Status</Box>
              </Typography>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Id}
              </TableCell>
              <TableCell align="right">{row.Owner}</TableCell>
              <TableCell align="right">{row.Issuance}</TableCell>
              <TableCell align="right">{row.Signed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </div>
  );
};

export default MyHistory;
