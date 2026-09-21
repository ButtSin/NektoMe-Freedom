import { useEffect } from 'react';

import { PopupPage } from '@/pages/popup';
import { UI_EVENTS, utilClasses } from '@/shared/config/constants';

import { PopupLayout } from '../layouts';

const App = () => {
  useEffect(() => {
    const showApp = () => {
      document.documentElement.classList.remove(utilClasses.hide, utilClasses.disableAnimation);
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
