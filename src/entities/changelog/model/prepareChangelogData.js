import { compareVersions } from './compareVersions';

const prepareChangelogData = (data) =>
  [...data]
    .sort((a, b) => compareVersions(a.version, b.version))
    .map((option, index) => ({
      ...option,
      id: `version-${option.version}`,
      isSelected: index === 0,
      value: option.version,
    }));

export { prepareChangelogData };
