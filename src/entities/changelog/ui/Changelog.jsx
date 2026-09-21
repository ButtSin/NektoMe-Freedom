import { useId, useState } from 'react';

import { Select } from '@/shared/ui/atoms/Select';

import { changelogData } from '../model/changelogData';

import styles from './Changelog.module.scss';

const Changelog = () => {
  const infoId = useId();

  const [currentVersionData, setCurrentVersionData] = useState(
    changelogData.find((option) => option.isSelected) ?? changelogData[0] ?? null,
  );

  return (
    <div className={`${styles.changelog}`}>
      <Select
        className={`${styles.changelog__select}`}
        options={changelogData}
        onChange={(_, data) => setCurrentVersionData(data)}
        ariaDescribedby={infoId}
        description='Версия: '
      ></Select>
      <div id={infoId} className={`${styles.changelog__info}`} aria-live='polite'>
        {currentVersionData?.children}
      </div>
    </div>
  );
};

export { Changelog };
