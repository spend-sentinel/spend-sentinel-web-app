import React, { FunctionComponent, useState } from 'react';
// import dayjs from 'dayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Button } from '@mui/material';
import { DisplayTransactions, GetMonthlyStatuses } from './serverCommunication.tsx';
import { SpendSentinelAppBar } from './appBar.tsx';
import { DatePagination } from './datePagination.tsx';
import { useQuery } from 'react-query';

export const Layout: FunctionComponent = () => {
  const { data: monthlyStatuses, error, isLoading } = useQuery('monthlyStatuses', GetMonthlyStatuses);
  // const [startDate, setStartDate] = useState(dayjs());
  // const [endDate, setEndDate] = useState(dayjs());
  // const [showTable, setShowTable] = useState(false);
  const [monthToShow, setMonthToShow] = useState(new Date().getMonth() + 1);
  const [yearToShow, setYearToShow] = useState(new Date().getFullYear());
  // const [start, setStart] = useState(dayjs()); // convert to state
  // const [end, setEnd] = useState(dayjs()); // convert to state

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (undefined === monthlyStatuses) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <SpendSentinelAppBar />
      <DatePagination
        monthlyStatuses={monthlyStatuses}
        onclick={(date) => {
          const [month, year] = date.split('/');
          // setShowTable(true);
          setMonthToShow(+month);
          setYearToShow(+year);
        }}
      />
      {/* <DatePicker
        onAccept={(selectedDate) => {
          setStart(selectedDate!);
        }}
        defaultValue={dayjs()}
        sx={{ marginX: '5px', marginY: '30px' }}
        format={'DD/MM/YYYY'}
        maxDate={endDate}
      />
      <DatePicker
        onAccept={(selectedDate) => {
          setEnd(selectedDate!);
        }}
        defaultValue={dayjs()}
        minDate={startDate}
        maxDate={dayjs()}
        sx={{ marginX: '5px', marginY: '30px' }}
        format={'DD/MM/YYYY'}
      />
      <Button
        variant='contained'
        onClick={() => {
          setStartDate(start);
          setEndDate(end);
          setShowTable(true);
        }}
        sx={{ marginX: '10px', marginY: '40px' }}
      >
        Show me the money!
      </Button> */}
      <DisplayTransactions year={yearToShow} month={monthToShow} />
    </div>
  );
};
