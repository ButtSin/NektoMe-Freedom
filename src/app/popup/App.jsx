import { useEffect } from 'react';

import { PopupPage } from '@/pages/popup';
import { UI_EVENTS } from '@/shared/config/events';
import { UTIL_CLASSES } from '@/shared/ui/externalStateClasses';

import { PopupLayout } from '../layouts';

const App = () => {
  useEffect(() => {
    const showApp = () => {
      document.documentElement.classList.remove(UTIL_CLASSES.hide, UTIL_CLASSES.disableAnimation);
    };

    document.addEventListener(UI_EVENTS.firstTabsUpdate, showApp, { once: true });

    return () => document.removeEventListener(UI_EVENTS.firstTabsUpdate, showApp);
  }, []);

  return (
    <PopupLayout>
      <PopupPage />
    </PopupLayout>
  );
};

export { App };
