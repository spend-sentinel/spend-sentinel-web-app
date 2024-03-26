import axios from 'axios';
import { serverUrl, transactionsInMonthSuffix } from './environment.ts';
import { useQuery } from 'react-query';
import React, { FunctionComponent, useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NColorsButton } from './NColorsButton.tsx';
import { dateFormatter } from './utils.ts';
import { statusColors } from './utils.ts';
import { queryClient } from '../App.tsx';
import { MoneyTransaction } from '../../../transaction-api/src/types';

const getMonthTransactions = async ({ queryKey }): Promise<MoneyTransaction[]> => {
  const year = queryKey[1];
  const month = queryKey[2];
  const response = await axios.get(serverUrl + transactionsInMonthSuffix, {
    params: {
      month: month,
      year: year,
    },
  });

  // response.data.sort((a: MoneyTransaction, b: MoneyTransaction) => {
  //   return new Date(b.TransactionDate).getTime() - new Date(a.TransactionDate).getTime();
  // });
  return response.data as MoneyTransaction[];
};

const updateTransaction = async (transaction: MoneyTransaction): Promise<boolean> => {
  transaction.Status = (transaction.Status + 1) % 3;
  const response = await axios.post(serverUrl, transaction);
  if (response.status === 200) {
    queryClient.invalidateQueries({ queryKey: ['monthColor'] });
    return true;
  }
  return false;
};

interface Props {
  year: number;
  month: number;
}

const tableBorders = { border: 3 };
const cellBorder = { border: 1 };

export const DisplayTransactions: FunctionComponent<Props> = ({ year, month }) => {
  const { data: transactions, error, isLoading } = useQuery(['transactionsData', year, month], getMonthTransactions);
  useMemo(() => {
    if (undefined === transactions) return;
    transactions.sort((a: MoneyTransaction, b: MoneyTransaction) => {
      return new Date(b.TransactionDate).getTime() - new Date(a.TransactionDate).getTime();
    });
  }, [transactions]);
  if (isLoading || undefined === transactions) return <div>Fetching Data...</div>;
  if (error) return <div>An error occurred!</div>;

  return (
    <div style={{ height: '800px', overflow: 'scroll' }}>
      <TableContainer component={Paper}>
        <Table sx={{ width: '675px' }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={tableBorders}>
              <TableCell sx={tableBorders} align='center'>
                Status
              </TableCell>
              <TableCell sx={tableBorders} align='center'>
                Description
              </TableCell>
              <TableCell sx={tableBorders} align='center'>
                Amount
              </TableCell>
              <TableCell sx={tableBorders} align='center'>
                Currency
              </TableCell>
              <TableCell sx={tableBorders} align='center'>
                Date
              </TableCell>
              <TableCell sx={tableBorders} align='center'>
                Card Number
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row: MoneyTransaction) => (
              <TableRow key={row.TransNum} sx={tableBorders}>
                <TableCell sx={cellBorder} align='center'>
                  <NColorsButton
                    onClick={updateTransaction}
                    colors={statusColors}
                    initialColorNumber={row.Status}
                    data={row}
                  ></NColorsButton>
                </TableCell>
                <TableCell sx={tableBorders} align='center'>
                  {row.Description}
                </TableCell>
                <TableCell sx={tableBorders} align='center'>
                  {row.Amount}
                </TableCell>
                <TableCell sx={tableBorders} align='center'>
                  {row.Currency}
                </TableCell>
                <TableCell sx={tableBorders} align='center'>
                  {dateFormatter(new Date(row.TransactionDate.toString()))}
                </TableCell>
                <TableCell sx={tableBorders} align='center'>
                  {row.CardNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
