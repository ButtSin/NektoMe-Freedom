import { useEffect, useState } from 'react';

import { settingsManager, STORAGE_KEYS } from '@/entities/settings';
import { Switch } from '@/shared/ui/atoms/Switch';

import { switches } from '../config/switches';

import { ThemeSwitcher } from './ThemeSwitcher';

import styles from './Settings.module.scss';

const defaultSettings = settingsManager.getDefaultSettings();
const SETTER_BY_ID = {
  [STORAGE_KEYS.content.sexFieldUnlocked]: settingsManager.setLocalSexFieldUnlocked,
  [STORAGE_KEYS.content.copyUnlocked]: settingsManager.setLocalCopyUnlocked,
  [STORAGE_KEYS.ui.advices]: settingsManager.setLocalAdviceUnlocked,
};
const adviceUrl = chrome.runtime.getURL('src/html/advices/index.html');

const Settings = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const initFieldsValue = async () => {
      const [sex, copy, advices] = await Promise.all([
        settingsManager.getLocalSexFieldUnlocked(),
        settingsManager.getLocalCopyUnlocked(),
        settingsManager.getLocalAdvicesUnlocked(),
      ]);

      setSettings({
        [STORAGE_KEYS.content.sexFieldUnlocked]: sex ?? defaultSettings.sexFieldUnlocked,
        [STORAGE_KEYS.content.copyUnlocked]: copy ?? defaultSettings.copyUnlocked,
        [STORAGE_KEYS.ui.advices]: advices ?? defaultSettings.advices,
      });
    };

    initFieldsValue();
  }, []);

  const handleSwitchChange = async (event, id) => {
    const currentSetter = SETTER_BY_ID[id];
    const newSwitchValue = event.currentTarget.checked;

    await currentSetter(newSwitchValue);
    setSettings((oldSettings) => ({ ...oldSettings, ...{ [id]: newSwitchValue } }));
  };

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
