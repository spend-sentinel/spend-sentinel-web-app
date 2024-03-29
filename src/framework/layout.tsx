import React, { FunctionComponent, useState } from 'react';
import { TransactionsTable } from './transactionsTable.tsx';
import { SpendSentinelAppBar } from './appBar.tsx';
import { InfiniteMonthScroller } from './infiniteMonthScroller.tsx';

export const Layout: FunctionComponent = () => {
  const [monthToShow, setMonthToShow] = useState(new Date().getMonth() + 1);
  const [yearToShow, setYearToShow] = useState(new Date().getFullYear());

  return (
    <div>
      <SpendSentinelAppBar />
      <InfiniteMonthScroller
        onPageChange={(date) => {
          const [month, year] = date.split('/');
          setMonthToShow(+month);
          setYearToShow(+year);
        }}
      ></InfiniteMonthScroller>
      <TransactionsTable year={yearToShow} month={monthToShow} />
    </div>
  );
};
