import RadioGroup from "@/html/shared/components/RadioGroup/RadioGroup";
import SettingsManager from "@/js/SettingsManager";
import { useEffect, useState } from "react";

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

function ThemeSwticher() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
    SettingsManager.setLocalTheme(theme);
    applyTheme(theme);
  };

  const applyTheme = async (theme) => {
    const htmlElement = document.documentElement;

    htmlElement.classList.remove("is-light", "is-dark");

    switch (theme) {
      case "light": {
        htmlElement.classList.add("is-light");

        break;
      }
      case "dark": {
        htmlElement.classList.add("is-dark");

        break;
      }
      case "system": {
        const systemDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        htmlElement.classList.add(systemDark ? "is-dark" : "is-light");

        break;
      }
    }
  };

  useEffect(() => {
    SettingsManager.getLocalTheme().then((theme) => {
      setSelectedTheme(theme);
      applyTheme(theme);
    });
  }, [selectedTheme]);

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

export default ThemeSwticher;
