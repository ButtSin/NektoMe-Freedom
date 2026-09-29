import { useEffect, useState } from 'react';

import { SETTINGS_IDS, settingsManager } from '@/entities/settings';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { adviceUrl } from '@/shared/config/constants';
import { Switch } from '@/shared/ui/atoms/Switch';

import { switches } from '../config/switchesData';

import styles from './Settings.module.scss';

const Settings = () => {
  const [settings, setSettings] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initFieldsValue = async () => {
      const [sex, copy, advices] = await Promise.all([
        settingsManager.getSettingValue(SETTINGS_IDS.sexFieldUnlocked),
        settingsManager.getSettingValue(SETTINGS_IDS.copyUnlocked),
        settingsManager.getSettingValue(SETTINGS_IDS.advices),
      ]);

      setSettings({
        [SETTINGS_IDS.sexFieldUnlocked]: sex,
        [SETTINGS_IDS.copyUnlocked]: copy,
        [SETTINGS_IDS.advices]: advices,
      });

      setIsLoaded(true);
    };

    initFieldsValue();
  }, []);

  const handleSwitchChange = async (event, id) => {
    const newSwitchValue = event.currentTarget.checked;

    await settingsManager.setSettingValue(id, newSwitchValue);
    setSettings((oldSettings) => ({ ...oldSettings, ...{ [id]: newSwitchValue } }));
  };

  if (!isLoaded) return null;

  return (
    <div className={`${styles.settings}`}>
      {switches.map((switchItem) => {
        return (
          <Switch
            key={switchItem.id}
            mainDescription={switchItem.mainDescription}
            secondaryDescription={switchItem.secondaryDescription}
            isActive={settings[switchItem.id]}
            requiredContent={switchItem.requiredContent?.(adviceUrl)}
            onChange={(event) => handleSwitchChange(event, switchItem.id)}
          />
        );
      })}
      <ThemeSwitcher />
    </div>
  );
};

export { Settings };
