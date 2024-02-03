import React, { FunctionComponent, useState } from 'react';
import { DisplayTransactions } from './serverCommunication.tsx';
import { SpendSentinelAppBar } from './appBar.tsx';
import { DatePagination } from './datePagination.tsx';

export const Layout: FunctionComponent = () => {
  const [monthToShow, setMonthToShow] = useState(new Date().getMonth() + 1);
  const [yearToShow, setYearToShow] = useState(new Date().getFullYear());
  return (
    <div>
      <SpendSentinelAppBar />
      <DatePagination
        onclick={(date) => {
          const [month, year] = date.split('/');
          setMonthToShow(+month);
          setYearToShow(+year);
        }}
      />
      <DisplayTransactions year={yearToShow} month={monthToShow} />
    </div>
  );
};
