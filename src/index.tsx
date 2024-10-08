import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import vConsole from 'vconsole'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
//new vConsole();
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
            <Toaster />
        </ThemeProvider>
    </React.StrictMode>
);

//  reportWebVitals();
