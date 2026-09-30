import { useEffect, useState } from 'react';

import { SETTINGS_IDS, settingsManager } from '@/entities/settings/';
import { ThemeContext } from '@/entities/settings/ui/ThemeContext';
import { applyTheme } from '@/shared/lib/dom/applyTheme';
import { THEME_CLASSES } from '@/shared/ui/externalStateClasses';

function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = await settingsManager.getSettingValue(SETTINGS_IDS.theme);

      applyTheme(savedTheme, THEME_CLASSES);
      setSelectedTheme(savedTheme);
    };

    initTheme();
  }, []);

  const changeTheme = async (theme) => {
    await settingsManager.setSettingValue(SETTINGS_IDS.theme, theme);

    applyTheme(theme, THEME_CLASSES);
    setSelectedTheme(theme);
  };

  return <ThemeContext value={{ selectedTheme, changeTheme }}>{children}</ThemeContext>;
}

export { ThemeContext, ThemeProvider };
