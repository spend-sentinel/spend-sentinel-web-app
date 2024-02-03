import React, { FunctionComponent } from 'react';
import './index.css';
import { Layout } from './framework/layout.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const queryClient = new QueryClient();

export const App: FunctionComponent = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Layout />
    </LocalizationProvider>
  </QueryClientProvider>
);
