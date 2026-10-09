import { useId, useState } from 'react';

import { Select } from '@/shared/ui/molecules/Select';

import { prepareChangelogData } from '../model/prepareChangelogData';

import { changelogData } from './changelogData';

import styles from './Changelog.module.scss';

const Changelog = () => {
  const infoId = useId();

  const [preparedChangelogData] = useState(() => prepareChangelogData(changelogData));
  const [currentVersionData, setCurrentVersionData] = useState(
    () =>
      preparedChangelogData.find((option) => option.isSelected) ?? preparedChangelogData[0] ?? null,
  );

  return (
    <div className={`${styles.changelog}`}>
      <Select
        className={`${styles.changelog__select}`}
        options={preparedChangelogData}
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
