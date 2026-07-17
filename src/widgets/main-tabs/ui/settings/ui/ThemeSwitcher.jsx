import { RadioGroup } from "@/shared/ui/molecules/RadioGroup";
import { settingsManager } from "@/entities/settings/";
import { use } from "react";
import { ThemeContext } from "@/app/providers/ThemeContext";
import { applyTheme } from "@/shared/lib/dom/applyTheme";
import { themeSwitcherData } from "../config/themeSwitcherData";

function ThemeSwitcher() {
  const { selectedTheme, setSelectedTheme } = use(ThemeContext);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
    settingsManager.setLocalTheme(theme);
    applyTheme(theme);
  };

  return (
    <RadioGroup
      mainDescription={themeSwitcherData.mainDescription}
      secondaryDescription={themeSwitcherData.secondaryDescription}
      name={themeSwitcherData.name}
      radios={themeSwitcherData.radios}
      selected={selectedTheme}
      onChange={handleSelectTheme}
    />
  );
}

export default ThemeSwitcher;
