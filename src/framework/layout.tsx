import React, { FunctionComponent, useState } from 'react';
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import DisplayTransactions from './serverCommunication.tsx';

interface LayoutProps {
}

export const Layout: FunctionComponent<LayoutProps> = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [showTable, setShowTable] = useState(false);
  let start;
  let end;

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onAccept={ (selectedDate) => {start = selectedDate} }
                           defaultValue={dayjs()}
                           sx = {{marginX:'5px', marginY:'30px'}}
                           format={'DD/MM/YYYY'}
                           maxDate={endDate}/>
          <DatePicker onAccept={ (selectedDate) => {end = selectedDate} }
                           defaultValue={dayjs()}
                           minDate={startDate}
                           maxDate={dayjs()}
                           sx = {{marginX:'5px', marginY:'30px'}}
                           format={'DD/MM/YYYY'}/>
          <Button variant="contained"
                  onClick={ () => {setStartDate(start); setEndDate(end); setShowTable(true)}}
                  sx = {{marginX: '10px', marginY:'40px'}}>
                  Show me the money!
          </Button>
          {DisplayTransactions(startDate, endDate, showTable)}
        </LocalizationProvider>
    );
}