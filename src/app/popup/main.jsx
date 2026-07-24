import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/app/providers/ThemeContext.jsx';
import { extensionName, extensionVersion } from '@/shared/config/constants';
import { PromiseRejectionHandler } from '@/shared/lib/PromiseRejectionHandler.js';

import { App } from './App.jsx';

import '@/app/styles/main.scss';

new PromiseRejectionHandler(extensionName, extensionVersion).promiseGlobalErrorSetup();

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
