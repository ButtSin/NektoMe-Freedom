import { useEffect, useState } from 'react';

import ThemeSwitcher from './ThemeSwitcher';
import { Switch } from '@/shared/ui/atoms/Switch';
import styles from './Settings.module.scss';
import { switches } from '../config/switches';

const Settings = (props) => {
  return (
    <div className={`${styles.settings}`}>
      {switches.map((switchItem) => {
        return (
          <Switch
            key={switchItem.mainDescription}
            mainDescription={switchItem.mainDescription}
            secondaryDescription={switchItem.secondaryDescription}
            isActive={switchItem.isActive}
            requiredContent={switchItem.requiredContent}
          />
        );
      })}{' '}
      <ThemeSwitcher />
    </div>
  );
};

export { Settings };
