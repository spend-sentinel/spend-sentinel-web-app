import { Button, List } from '@mui/material';
import usePagination from '@mui/material/usePagination/usePagination';
import React, { FunctionComponent, useState } from 'react';
import { getDates } from './utils.ts';
import { MonthlyStatus } from './types.ts';
import { DateAndColor } from './types.ts';

interface DatePaginationProps {
  monthlyStatuses: MonthlyStatus[];
  onclick: (date: string) => void;
}

export const DatePagination: FunctionComponent<DatePaginationProps> = ({ onclick, monthlyStatuses }) => {
  const [dates] = useState(getDates(monthlyStatuses));
  const { items } = usePagination(
    dates
      ? {
          count: dates.length,
          defaultPage: dates.length,
          onChange: (event, page) => {
            onclick(dates[page - 1][DateAndColor.DATE]);
          },
        }
      : {},
  );

  if (undefined === dates) {
    return <div>Please try again later</div>;
  }
  if (undefined === monthlyStatuses) {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      <nav>
        <List style={{ display: 'flex', flexDirection: 'row' }}>
          {items.map(({ page, type, selected, ...item }) => {
            let children: React.JSX.Element | string = '';
            if (null === page) {
              return <div key={page + type}></div>;
            }
            const datesIndex = page - 1;
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = <div>...</div>;
            } else if (type === 'page' || type === 'last' || type === 'first') {
              children = (
                <Button
                  style={{
                    opacity: selected ? 1 : 0.66,
                    marginLeft: '3px',
                    marginRight: '3px',
                    backgroundColor: dates[datesIndex][DateAndColor.COLOR],
                    color: 'black',
                  }}
                  variant={selected ? 'contained' : 'outlined'}
                  {...item}
                >
                  {dates[datesIndex][DateAndColor.DATE]}
                </Button>
              );
            } else {
              children = (
                <Button {...item} variant='outlined'>
                  {type === 'next' ? '>>' : '<<'}
                </Button>
              );
            }
            return <div key={page + type}>{children}</div>;
          })}
        </List>
      </nav>
    </div>
  );
};

export default DatePagination;
