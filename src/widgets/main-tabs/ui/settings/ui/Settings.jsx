import { useEffect, useState } from 'react';

import { Switch } from '@/shared/ui/atoms/Switch';

import { switches } from '../config/switches';

import { ThemeSwitcher } from './ThemeSwitcher';

import styles from './Settings.module.scss';

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
