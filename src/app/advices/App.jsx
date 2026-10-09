import { useEffect, useState } from 'react';

import { AdvicesPage } from '@/pages/advices';
import { UI_EVENTS } from '@/shared/config/events';
import { useRevealApp } from '@/shared/lib/hooks/useRevealApp';

import { ExtensionLayout } from '../layouts/ExtensionLayout';

const App = () => {
  const [isThemeReady, setIsThemeReady] = useState(false);

  useRevealApp();

  useEffect(() => {
    const handleThemeReady = () => setIsThemeReady(true);

    document.addEventListener(UI_EVENTS.themeReady, handleThemeReady, { once: true });

    return () => document.removeEventListener(UI_EVENTS.themeReady, handleThemeReady);
  }, []);

  useEffect(() => {
    if (isThemeReady) {
      document.dispatchEvent(new Event(UI_EVENTS.appReady));
    }
  }, [isThemeReady]);

  return (
    <ExtensionLayout>
      <AdvicesPage />
    </ExtensionLayout>
  );
};

export { App };
