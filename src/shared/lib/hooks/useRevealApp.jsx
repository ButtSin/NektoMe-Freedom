import { useEffect } from 'react';

import { UI_EVENTS } from '@/shared/config/events';
import { UTIL_CLASSES } from '@/shared/config/externalStateClasses';

const useRevealApp = () => {
  useEffect(() => {
    const revealApp = () => {
      document.documentElement.classList.remove(UTIL_CLASSES.hide);
      void document.documentElement.offsetHeight;
      document.documentElement.classList.remove(UTIL_CLASSES.disableAnimation);
    };

    document.addEventListener(UI_EVENTS.appReady, revealApp, { once: true });

    return () => document.removeEventListener(UI_EVENTS.appReady, revealApp);
  }, []);
};

export { useRevealApp };
