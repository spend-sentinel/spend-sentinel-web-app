import { Button, List } from '@mui/material';
import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import { MonthButton } from './monthButton.tsx';
import { formatMonthYear } from './utils.ts';
import styled from '@emotion/styled';

interface Props {
  onPageChange: (date: string) => void;
}

const isCurrDateLatest = (currDate: string): boolean => {
  return formatMonthYear(new Date().getMonth() + 1, new Date().getFullYear()) === currDate;
};

const getCurrentDateAsString = () => {
  return formatMonthYear(new Date().getMonth() + 1, new Date().getFullYear());
};

const getMonthsArray = (currMonth: string, numMonthsToShow): string[] => {
  const dates: string[] = [];
  const [month, year] = currMonth.split('/').map(Number);
  const today = new Date();
  const diffInMonths = (today.getFullYear() - year) * 12 + (today.getMonth() + 1 - month);
  if (diffInMonths < Math.ceil(numMonthsToShow / 2)) {
    for (let i = 0; i < numMonthsToShow; i++) {
      const newDate = new Date();
      newDate.setMonth(newDate.getMonth() - i);
      dates.push(formatMonthYear(newDate.getMonth() + 1, newDate.getFullYear()));
    }
  } else {
    for (let i = Math.floor(numMonthsToShow / 2); i > -Math.ceil(numMonthsToShow / 2); i--) {
      const newDate = new Date(year, month);
      newDate.setMonth(newDate.getMonth() + i - 1);
      dates.push(formatMonthYear(newDate.getMonth() + 1, newDate.getFullYear()));
    }
  }
  return dates;
};

const getFiveMonthButtons = (onPageChange: (date: string) => void, currDate: string, setCurrDate: (date: string) => void) => {
  // const [numMonthsToShow, setNumMonthsToShow] = useState(5);
  const numMonthsToShow = 5;
  const months = getMonthsArray(currDate, numMonthsToShow);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {months.map((date: string) => {
        const [month, year] = date.split('/').map(Number);
        return (
          <MonthButton
            key={month}
            onclick={() => {
              setCurrDate(date);
              onPageChange(date);
            }}
            month={month}
            year={year}
            currDate={currDate}
            date={date}
          ></MonthButton>
        );
      })}
    </div>
  );
};

const getNewDate = (currDate: string, monthChange: number): string => {
  const [month, year] = currDate.split('/').map(Number);
  const newDate = new Date(year, month - 1);
  newDate.setMonth(newDate.getMonth() + monthChange);
  return formatMonthYear(newDate.getMonth() + 1, newDate.getFullYear());
};

export const InfiniteMonthScroller: FunctionComponent<Props> = ({ onPageChange }) => {
  const [currDate, setCurrDate] = useState(getCurrentDateAsString());

  const Button = styled.button`
    border-radius: 3px;
    margin-right: 5px; // Add margin between buttons
    width: 100%;
    height: 40px;
    border: solid 2px black;
    color: black;
    background-color: gray; // Corrected background color property
    transition:
      transform 0.3s,
      opacity 0.3s; // Add opacity transition for smooth effect
    opacity: ${({ disabled }) => (disabled ? '0.75' : '1')}; // Set opacity based on disabled prop
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')}; // Disable pointer events when disabled
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')}; // Change cursor style based on disabled prop
    &:hover {
      ${({ disabled }) => !disabled && 'transform: scale(1.15);'}// Apply transform only if not disabled
    }
  `;

  const onArrowClick = (monthChange: number): void => {
    const newDate = getNewDate(currDate, monthChange);
    setCurrDate(newDate);
    onPageChange(newDate);
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  return (
    <List sx={listStyle}>
      <Button onClick={() => onArrowClick(1)} disabled={isCurrDateLatest(currDate)}>
        {'<<'}
      </Button>
      {getFiveMonthButtons(onPageChange, currDate, setCurrDate)}
      <Button onClick={() => onArrowClick(-1)}>{'>>'}</Button>
    </List>
  );
};
