import React, { FunctionComponent, useState } from 'react';
import { DisplayTransactions } from './serverCommunication.tsx';
import { SpendSentinelAppBar } from './appBar.tsx';
import { DatePagination } from './datePagination.tsx';
import { MyPagination } from './myPagination.tsx';

export const Layout: FunctionComponent = () => {
  const [monthToShow, setMonthToShow] = useState(new Date().getMonth() + 1);
  const [yearToShow, setYearToShow] = useState(new Date().getFullYear());
  return (
    <div>
      <SpendSentinelAppBar />
      <MyPagination
        onPageChange={(date) => {
          console.log(date);
          const [month, year] = date.split('/');
          setMonthToShow(+month);
          setYearToShow(+year);
        }}
      ></MyPagination>
      {/* <DatePagination
        onchange={(date) => {
          const [month, year] = date.split('/');
          setMonthToShow(+month);
          setYearToShow(+year);
        }}
      /> */}
      <DisplayTransactions year={yearToShow} month={monthToShow} />
    </div>
  );
};
