import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals.js';
import { AppBar } from '@mui/material';
import Layout from './utlities/layout.tsx'

class SpendSentinelApp extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      <AppBar sx={{height:'30px'}}>
        Spend Sentinel App
      </AppBar>
      <Layout/>
      </div>
    );
  }
}


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<SpendSentinelApp/>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
