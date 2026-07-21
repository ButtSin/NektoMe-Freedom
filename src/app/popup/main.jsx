import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/app/providers/ThemeContext.jsx';
import ErrorHandlers from '@/shared/lib/ErrorHandler.js';

import { App } from './App.jsx';

import '@/app/styles/main.scss';

new ErrorHandlers().promiseGlobalErrorSetup();

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
