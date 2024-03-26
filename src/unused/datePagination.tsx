import { Button, List } from '@mui/material';
import usePagination from '@mui/material/usePagination/usePagination';
import React, { FunctionComponent, useMemo } from 'react';
import { getDates } from '../framework/utils.ts';
import { DateAndColor, MonthlyStatus } from '../framework/types.ts';
import { useQuery } from 'react-query';
import axios from 'axios';
import { monthStatusesURLSuffix, serverUrl } from '../framework/environment.ts';

interface Props {
  onchange: (date: string) => void;
}

const GetMonthlyStatuses = async (): Promise<MonthlyStatus[]> => {
  const response = await axios.get(serverUrl + monthStatusesURLSuffix);
  return response.data;
};

export const DatePagination: FunctionComponent<Props> = ({ onchange }) => {
  const { data: monthlyStatuses, error, isLoading } = useQuery('monthlyStatuses', GetMonthlyStatuses);
  const dates = useMemo(() => getDates(monthlyStatuses), [monthlyStatuses]);

  const { items } = usePagination(
    dates
      ? {
          count: dates.length,
          defaultPage: dates.length,
          onChange: (event, page) => {
            onchange(dates[page - 1][DateAndColor.DATE]);
          },
        }
      : {},
  );

  if (error) {
    return <div>An error occured</div>;
  }

  if (isLoading) {
    return <div>Loading AAA...</div>;
  }

  if (undefined === dates) {
    return <div>An error occured...</div>;
  }

  return (
    <List style={{ display: 'flex', flexDirection: 'row' }}>
      {items.map(({ page, type, selected, ...item }) => {
        let children: React.JSX.Element | string = '';
        if (null === page) {
          return <div key={page + type}></div>;
        }
        const datesIndex = page - 1;
        if (type === 'page') {
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
  );
};

export default DatePagination;
