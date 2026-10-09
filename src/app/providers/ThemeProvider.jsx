import { useEffect, useState } from 'react';

import { ThemeContext } from '@/entities/settings';
import { SETTINGS_IDS, settingsManager } from '@/entities/settings/';
import { UI_EVENTS } from '@/shared/config/events';
import { THEME_CLASSES } from '@/shared/config/externalStateClasses';
import { applyTheme } from '@/shared/lib/dom/applyTheme';

function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = await settingsManager.getSettingValue(SETTINGS_IDS.theme);
      applyTheme(savedTheme, THEME_CLASSES);
      setSelectedTheme(savedTheme);
      localStorage.setItem(SETTINGS_IDS.theme, THEME_CLASSES[savedTheme]);

      document.dispatchEvent(new Event(UI_EVENTS.themeReady));
    };

    initTheme();

    const unsubscribe = settingsManager.subscribe((changes) => {
      const themeChange = changes[SETTINGS_IDS.theme];
      if (!themeChange) return;

      const newTheme = themeChange.newValue;
      applyTheme(newTheme, THEME_CLASSES);
      setSelectedTheme(newTheme);
      localStorage.setItem(SETTINGS_IDS.theme, THEME_CLASSES[newTheme]);
    });

    return () => unsubscribe();
  }, []);

  const changeTheme = async (theme) => {
    await settingsManager.setSettingValue(SETTINGS_IDS.theme, theme);
  };

  return <ThemeContext value={{ selectedTheme, changeTheme }}>{children}</ThemeContext>;
}

export { ThemeProvider };
