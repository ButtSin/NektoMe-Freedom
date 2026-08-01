import { useEffect, useState } from 'react';

import { SETTINGS_IDS, settingsManager } from '@/entities/settings/';
import { themeClasses } from '@/shared/config/constants';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { applyTheme } from '@/shared/lib/dom/applyTheme';

function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = await settingsManager.getSettingValue(SETTINGS_IDS.theme);

      applyTheme(savedTheme, themeClasses);
      setSelectedTheme(savedTheme);
    };

    initTheme();
  }, []);

  const changeTheme = async (theme) => {
    await settingsManager.setSettingValue(SETTINGS_IDS.theme, theme);

    applyTheme(theme, themeClasses);
    setSelectedTheme(theme);
  };

  return <ThemeContext value={{ selectedTheme, changeTheme }}>{children}</ThemeContext>;
}

export { ThemeContext, ThemeProvider };
