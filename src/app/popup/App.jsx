import { useEffect, useState } from 'react';

import { PopupPage } from '@/pages/popup';
import { UI_EVENTS } from '@/shared/config/events';
import { useRevealApp } from '@/shared/lib/hooks/useRevealApp';

import { ExtensionLayout } from '../layouts/ExtensionLayout';

const App = () => {
  const [isTabReady, setIsTabReady] = useState(false);

  useRevealApp();

  useEffect(() => {
    const handleTabsReady = () => setIsTabReady(true);

    document.addEventListener(UI_EVENTS.firstTabsUpdate, handleTabsReady, { once: true });

    return () => document.removeEventListener(UI_EVENTS.firstTabsUpdate, handleTabsReady);
  }, []);

  useEffect(() => {
    if (isTabReady) {
      document.dispatchEvent(new Event(UI_EVENTS.appReady));
    }
  }, [isTabReady]);

  return (
    <ExtensionLayout>
      <PopupPage />
    </ExtensionLayout>
  );
};

export { App };
