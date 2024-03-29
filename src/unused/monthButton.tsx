import { Button } from '@mui/material';
import axios from 'axios';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { formatMonthYear, statusColors } from './utils.ts';
import { serverUrl, statusOfMonthSuffix } from './environment.ts';

interface Props {
  onclick: () => void;
  month: number;
  year: number;
  pageNumber?: number;
  currPage: number;
  text?: string;
}

const GetMonthColor = async (month: number, year: number): Promise<string> => {
  if (!month || !year) {
    return 'gray';
  }
  const params = {
    month: month,
    year: year,
  };
  const response = await axios.get(serverUrl + statusOfMonthSuffix, { params });

  if (response.status !== 200) {
    return 'purple';
  }

  if (+response.data < 0 || +response.data >= statusColors.length) {
    return 'blue';
  }
  return statusColors[+response.data];
};

export const PaginationButton: FunctionComponent<Props> = ({ onclick, month, year, pageNumber, currPage, text }) => {
  const { data: monthColor, error, isLoading } = useQuery(['monthColor', month, year], () => GetMonthColor(month, year));

  return (
    <Button
      style={{
        borderRadius: '3px',
        width: '100px',
        border: 'solid 2px black',
        backgroundColor: monthColor,
        color: 'black',
        opacity: 0 === month ? 1 : currPage === pageNumber ? 1 : 0.5,
      }}
      onClick={() => onclick()}
    >
      {undefined !== pageNumber ? formatMonthYear(month, year) : text}
    </Button>
  );
};
