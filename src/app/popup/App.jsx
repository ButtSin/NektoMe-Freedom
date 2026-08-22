import { useEffect } from 'react';

import { PopupPage } from '@/pages/popup';
import { utilClasses } from '@/shared/config/constants';
import { afterVisualUpdate } from '@/shared/lib/dom/afterVisualUpdate';

import { ExtensionLayout } from '../layouts/ExtensionLayout';

const App = () => {
  useEffect(() => {
    const waitForInitialLoad = async () => {
      await document.fonts.ready;
      await afterVisualUpdate(null, true);

      document.documentElement.classList.remove(utilClasses.hide, utilClasses.disableAnimation);
    };

    waitForInitialLoad();
  }, []);

  return (
    <ExtensionLayout>
      <PopupPage />
    </ExtensionLayout>
  );
};

export { App };
