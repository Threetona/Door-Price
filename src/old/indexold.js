// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Main from './Main';
import theme from '../theme';
import './styles.css';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
    </ThemeProvider>,
    document.getElementById('root'),
);
