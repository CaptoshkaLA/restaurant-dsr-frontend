import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Unable to find root element in the document.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </Provider>
);