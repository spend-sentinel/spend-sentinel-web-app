import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals.js';
import { AppBar } from '@mui/material';
import {Layout} from './framework/layout.tsx'
import { QueryClient, QueryClientProvider } from 'react-query';
import { SpendSentinelAppBar } from './framework/appBar.tsx';

const queryClient = new QueryClient();

class SpendSentinelApp extends React.Component<{}, {}> {
  render() {
    return (

      <div>
        <div>
          {<SpendSentinelAppBar/>}
        </div>
        <div>
          {<Layout/>}
        </div>
      </div>
    );
  }
}


const main = () => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render( 
  <QueryClientProvider client={queryClient}>
    <SpendSentinelApp />
  </QueryClientProvider>,);
  reportWebVitals();
}
main();