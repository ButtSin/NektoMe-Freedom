import RadioGroup from "@/html/shared/components/RadioGroup/RadioGroup";
import SettingsManager from "@/js/SettingsManager";
import { use } from "react";
import { ThemeContext } from "@/js/contexts/ThemeContext";
import { applyTheme } from "@/js/utils/themeUtils";

const data = {
  mainDescription: "Тема",
  secondaryDescription: "Выберите тему оформления",
  name: "theme",
  radios: [
    {
      mainDescription: "Светлая",
      value: "light",
    },
    {
      mainDescription: "Тёмная",
      value: "dark",
    },
    {
      mainDescription: "Системная",
      value: "system",
    },
  ],
};

function ThemeSwitcher() {
  const { selectedTheme, setSelectedTheme } = use(ThemeContext);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
    SettingsManager.setLocalTheme(theme);
    applyTheme(theme);
  };

  return (
    <RadioGroup
      mainDescription={data.mainDescription}
      secondaryDescription={data.secondaryDescription}
      name={data.name}
      radios={data.radios}
      selected={selectedTheme}
      onChange={handleSelectTheme}
    />
  );
}

export default ThemeSwitcher;
