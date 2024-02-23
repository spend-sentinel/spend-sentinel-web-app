import axios from 'axios';
import { serverUrl, transactionsInMonthSuffix } from './environment.ts';
import { useQuery } from 'react-query';
import React, { FunctionComponent } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NColorsButton } from './NColorsButton.tsx';
import { dateFormatter } from './utils.ts';
import { statusColors } from './utils.ts';
import { queryClient } from '../App.tsx';
import {MoneyTransaction} from '../../../transaction-api/src/types'

const GetMonthTransactions = async ({ queryKey }) => {
  const year = queryKey[1];
  const month = queryKey[2];
  const response = await axios.get(serverUrl + transactionsInMonthSuffix, {
    params: {
      month: month,
      year: year,
    },
  });
  return response.data;
};

const updateTransaction = async (transaction): Promise<boolean> => {
  transaction.Status = (transaction.Status + 1) % 3;
  const response = (await axios.put(serverUrl, transaction)).status === 200;
  queryClient.invalidateQueries({ queryKey: ['monthlyStatuses'] })
  return response;
};

interface DisplayTransactionsProps {
  year: number;
  month: number;
}

export const DisplayTransactions: FunctionComponent<DisplayTransactionsProps> = ({ year, month }) => {
  const { data: transactions, error, isLoading } = useQuery(['transactionsData', year, month], GetMonthTransactions);
  if (isLoading) return <div>Fetching Data...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ border: 3 }}>
              <TableCell sx={{ border: 3 }} align='center'>
                Status
              </TableCell>
              <TableCell sx={{ border: 3 }} align='center'>
                Description
              </TableCell>
              <TableCell sx={{ border: 3 }} align='center'>
                Amount
              </TableCell>
              <TableCell sx={{ border: 3 }} align='center'>
                Currency
              </TableCell>
              <TableCell sx={{ border: 3 }} align='center'>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row: MoneyTransaction) => (
              <TableRow key={row.TransNum} sx={{ border: 3 }}>
                <TableCell sx={{ border: 1 }} align='center'>
                  <NColorsButton
                    onClick={updateTransaction}
                    colors={statusColors}
                    initialColorNumber={row.Status}
                    data={row}
                  ></NColorsButton>
                </TableCell>
                <TableCell sx={{ border: 3 }} align='center'>
                  {row.Description}
                </TableCell>
                <TableCell sx={{ border: 3 }} align='center'>
                  {row.Amount}
                </TableCell>
                <TableCell sx={{ border: 3 }} align='center'>
                  {row.Currency}
                </TableCell>
                <TableCell sx={{ border: 3 }} align='center'>
                  {dateFormatter(new Date(row.TransactionDate.toString()))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
