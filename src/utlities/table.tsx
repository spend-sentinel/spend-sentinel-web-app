import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { FunctionComponent } from 'react';
import dayjs, { } from 'dayjs';
import { getTransactionsFromServer, setTransactionStatus} from './communication.ts';

interface Props { 
  showTable: boolean;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
}

const getButtonStatus = (transactions:any[], index:number):string => { // returns color
  const statuses = ['red','yellow','green'];
  return statuses[transactions[index][1]];
}


export const TransactionsTable: FunctionComponent<Props> = ({showTable, startDate, endDate}) => {
  const [transactions, setTransactions] = useState(getTransactionsFromServer(startDate, endDate));
  return (
  <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Currency</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showTable && transactions.map((row:any, index:any) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.values(row).map((rowValue:any, subIndex:number) =>
              subIndex !== 0 && (subIndex !== 1 ? <TableCell align="center" key={subIndex}>
                {rowValue}
              </TableCell> :
              <TableCell key={subIndex} align="center">
                <Button 
                  style= {
                    {
                      borderRadius: '2px',
                      width: '60px',
                      border: 'solid 3px black',
                      backgroundColor: getButtonStatus(transactions, index)
                    }}
                  variant="contained" onClick={() => {
                      setTransactionStatus(transactions[index]);
                      setTransactions(getTransactionsFromServer(startDate, endDate));
                    }}>
                 </Button>
              </TableCell>))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}