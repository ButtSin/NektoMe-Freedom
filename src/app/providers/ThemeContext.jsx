import { createContext, useEffect, useState } from 'react';

import { settingsManager } from '@/entities/settings/';
import { DEFAULT_SETTINGS } from '@/entities/settings/config/settings';
import { themeClasses } from '@/shared/config/constants';
import { applyTheme } from '@/shared/lib/dom/applyTheme';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = (await settingsManager.getLocalTheme()) ?? DEFAULT_SETTINGS.theme;

      applyTheme(savedTheme, themeClasses);
      setSelectedTheme(savedTheme);
    };

    initTheme();
  }, []);

  const changeTheme = async (theme) => {
    await settingsManager.setLocalTheme(theme);

    applyTheme(theme, themeClasses);
    setSelectedTheme(theme);
  };

  return <ThemeContext value={{ selectedTheme, changeTheme }}>{children}</ThemeContext>;
}

export { ThemeContext, ThemeProvider };
