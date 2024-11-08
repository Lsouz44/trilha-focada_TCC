import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router/AppRouter';

import { ThemeProvider } from "styled-components"
import theme from "./styles/theme"
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>
);
