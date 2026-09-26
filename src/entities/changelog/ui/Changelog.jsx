import { useId, useState } from 'react';

import { Select } from '@/shared/ui/atoms/Select';

import { changelogData } from '../model/changelogData';
import { prepareChangelogData } from '../model/prepareChangelogData';

import styles from './Changelog.module.scss';

const currentChangelogData = prepareChangelogData(changelogData);

const Changelog = () => {
  const infoId = useId();

  const [currentVersionData, setCurrentVersionData] = useState(
    () =>
      currentChangelogData.find((option) => option.isSelected) ?? currentChangelogData[0] ?? null,
  );

  return (
    <div className={`${styles.changelog}`}>
      <Select
        className={`${styles.changelog__select}`}
        options={currentChangelogData}
        onChange={(_, data) => setCurrentVersionData(data)}
        ariaDescribedby={infoId}
        description='Версия: '
      ></Select>
      <div id={infoId} className={`${styles.changelog__info}`} aria-live='polite'>
        <ul>
          {currentVersionData?.changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Changelog };
