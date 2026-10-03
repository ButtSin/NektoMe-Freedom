import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/app/providers/ThemeProvider.jsx';
import { getExtensionInfo } from '@/shared/lib/extension/info';
import { PromiseRejectionHandler } from '@/shared/lib/PromiseRejectionHandler';

import { App } from './App.jsx';

import '@/app/styles/main.scss';

const { EXTENSION_NAME, EXTENSION_VERSION } = getExtensionInfo();

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
