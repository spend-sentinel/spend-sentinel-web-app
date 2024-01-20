import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FunctionComponent } from 'react';
import dayjs, { } from 'dayjs';
import { setTransactionStatus, filterTransactions, TableHeaders } from './communication.ts';
import { NColorsButton } from './NColorsButton.tsx';

interface TransactionTableProps { 
  showTable: boolean;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
}

const getValuesAccordingToColumns = (row:Object): (number | string)[] => {
  // To see my honest opinion on this place holder function go to this url:
  // https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2F3v1u1utu0s561.png
  const array:(number|string)[] = [];
  array.push(row[TableHeaders.Status]);
  array.push(row[TableHeaders.Description]);
  array.push(row[TableHeaders.Amount]);
  array.push(row[TableHeaders.Currency]);
  array.push(row[TableHeaders.Date]);
  return array;
} 

export const TransactionsTable: FunctionComponent<TransactionTableProps> = ({showTable, startDate, endDate}) => {
  const [transactions, setTransactions] = useState(filterTransactions(startDate, endDate));
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
              {getValuesAccordingToColumns(row).map((rowValue:any, subIndex:number) =>
              (subIndex !== 0 ? <TableCell align="center" key={subIndex}>
                {rowValue}
              </TableCell> :
              <TableCell key={subIndex} align="center">
                 <NColorsButton
                      onClick={() => {
                          setTransactionStatus(transactions[index])
                          .then((response) => {
                            if (200 !== response.status) {
                              alert("Sorry, something went wrong.");
                              setTransactions(filterTransactions(startDate, endDate))
                            }
                          })
                          .catch((error) => {
                            alert("Sorry, something went wrong.");
                            setTransactions(filterTransactions(startDate, endDate))
                          });
                        }
                      }
                      colors={['yellow','green','red']}
                      initialColorNumber={ row[TableHeaders.Status] }
                 />
              </TableCell>))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}