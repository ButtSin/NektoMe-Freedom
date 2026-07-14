import { createContext, useEffect, useState } from "react";
import SettingsManager from "@/js/SettingsManager";
import { applyTheme } from "@/js/utils/themeUtils";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    SettingsManager.getLocalTheme().then((theme) => {
      setSelectedTheme(theme);
      applyTheme(theme);
    });
  }, []);

  return (
    <ThemeContext value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext>
  );
}

export { ThemeProvider, ThemeContext };
