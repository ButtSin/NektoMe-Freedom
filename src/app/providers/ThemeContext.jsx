import { createContext, useEffect, useState } from 'react';

import { settingsManager } from '@/entities/settings/';
import { applyTheme } from '@/shared/lib/dom/applyTheme';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    settingsManager.getLocalTheme().then((theme) => {
      setSelectedTheme(theme);
      applyTheme(theme);
    });
  }, []);

  return <ThemeContext value={{ selectedTheme, setSelectedTheme }}>{children}</ThemeContext>;
}

export { ThemeContext, ThemeProvider };
