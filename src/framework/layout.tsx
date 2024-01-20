import React from 'react';
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { TransactionsTable } from './table.tsx'
import { getTransactionsFromServer } from './communication.ts';


interface State {
  startDate: dayjs.Dayjs | null,
  endDate: dayjs.Dayjs | null,
  showTable:boolean
}

export default class Layout extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      startDate: dayjs(),
      endDate: dayjs(),
      showTable: false,
    };
  }

  onClickShowTransactionsHandler = () => {
    this.setState({startDate:this.state.startDate, endDate:this.state.endDate});
  }

  render() {
    let start;
    let end;
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onAccept={ (selectedDate) => {start = selectedDate} }
                           defaultValue={dayjs()}
                           sx = {{marginX:'5px', marginY:'30px'}}
                           format={'DD/MM/YYYY'}
                           maxDate={this.state.endDate}/>
          <DatePicker onAccept={ (selectedDate) => {end = selectedDate} }
                           defaultValue={dayjs()}
                           minDate={this.state.startDate}
                           maxDate={dayjs()}
                           sx = {{marginX:'5px', marginY:'30px'}}
                           format={'DD/MM/YYYY'}/>
          <Button variant="contained"
                  onClick={ () => {
                    if (this.state.showTable) { 
                      getTransactionsFromServer()
                      .catch((err) => {
                      alert("There was a problem connecting to the server \n" + err);
                    })
                    }
                    this.setState({startDate:start, endDate:end, showTable: true})}}
                  sx = {{marginX: '10px', marginY:'40px'}}>
                  Show me the money!
          </Button>
             <TransactionsTable showTable={this.state.showTable} startDate={this.state.startDate} endDate={this.state.endDate}/>
        </LocalizationProvider>
    );
  }
}