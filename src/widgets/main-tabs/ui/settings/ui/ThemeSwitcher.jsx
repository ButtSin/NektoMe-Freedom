import { use } from 'react';

import { ThemeContext } from '@/app/providers/ThemeContext';
import { RadioGroup } from '@/shared/ui/molecules/RadioGroup';

import { themeSwitcherData } from '../config/themeSwitcherData';

function ThemeSwitcher() {
  const { selectedTheme, changeTheme } = use(ThemeContext);

  const handleSelectTheme = (newTheme) => {
    changeTheme(newTheme);
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

export { ThemeSwitcher };
