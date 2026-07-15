import { createContext, useEffect, useState } from "react";
import SettingsManager from "@/entities/settings/model/SettingsManager";
import { applyTheme } from "@/shared/lib/dom/applyTheme";

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
