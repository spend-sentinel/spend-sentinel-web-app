import React, { FunctionComponent, useState } from 'react';
import { DisplayTransactions } from './serverCommunication.tsx';
import { SpendSentinelAppBar } from './appBar.tsx';
import { DatePagination } from '../unused/datePagination.tsx';
import { MonthlyPagination } from './monthlyPagination.tsx';

export const Layout: FunctionComponent = () => {
  const [monthToShow, setMonthToShow] = useState(new Date().getMonth() + 1);
  const [yearToShow, setYearToShow] = useState(new Date().getFullYear());
  return (
    <div>
      <SpendSentinelAppBar />
      <MonthlyPagination
        onPageChange={(date) => {
          const [month, year] = date.split('/');
          setMonthToShow(+month);
          setYearToShow(+year);
        }}
      ></MonthlyPagination>
      <DisplayTransactions year={yearToShow} month={monthToShow} />
    </div>
  );
};
