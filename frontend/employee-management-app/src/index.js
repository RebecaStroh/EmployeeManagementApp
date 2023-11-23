import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  shape: {
    borderRadius: 12
  },
  palette: {
    primary: {
      main: '#fff',
    },
    blue: {
      main: '#00b7cb',
      light: '#b1e9ee',
      dark: '#005b5d',
      contrastText: 'white',
    },
    orange: {
      main: '#fa9f55',
      light: '#ffe1c0',
      dark: '#e3794a',
      contrastText: 'white',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
