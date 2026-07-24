import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { PromiseRejectionHandler } from '@/app/lib/PromiseRejectionHandler.js';
import { ThemeProvider } from '@/app/providers/ThemeContext.jsx';

import { App } from './App.jsx';

import '@/app/styles/main.scss';

new PromiseRejectionHandler().promiseGlobalErrorSetup();

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
