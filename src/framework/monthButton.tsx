import axios from 'axios';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { statusColors } from './utils.ts';
import { serverUrl, statusOfMonthSuffix } from './routeNames.ts';
import styled from '@emotion/styled';

interface Props {
  onclick: (date: string) => void;
  month: number;
  year: number;
  currDate: string;
  date: string;
}

const GetMonthColor = async (month: number, year: number): Promise<string> => {
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

export const MonthButton: FunctionComponent<Props> = ({ onclick, month, year, currDate, date }) => {
  const { data: monthColor, error, isLoading } = useQuery(['monthColor', month, year], () => GetMonthColor(month, year));
  const Button = styled.button`
    border-radius: 3px;
    width: 100px;
    border: solid 2px black;
    margin-left: 3px;
    margin-right: 3px;
    color: black;
    transition: transform 0.3s; // Add transition for smooth effect
    &:hover {
      transform: scale(1.1); // Increase size on hover
    }
  `;
  const buttonStyle = {
    backgroundColor: error || isLoading ? 'white' : monthColor,
    opacity: currDate === date ? 1 : 0.5,
  };

  return (
    <Button style={buttonStyle} onClick={() => onclick(date)}>
      {date}
    </Button>
  );
};
