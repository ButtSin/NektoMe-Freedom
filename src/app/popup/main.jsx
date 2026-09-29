import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/app/providers/ThemeProvider.jsx';
import { EXTENSION_NAME, EXTENSION_VERSION } from '@/shared/config/appMeta.js';
import { PromiseRejectionHandler } from '@/shared/lib/PromiseRejectionHandler.js';

import { App } from './App.jsx';

import '@/app/styles/main.scss';

new PromiseRejectionHandler(EXTENSION_NAME, EXTENSION_VERSION).promiseGlobalErrorSetup();

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
