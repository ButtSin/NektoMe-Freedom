// исключение: model добавляет UI-поля id/isSelected;

import { compareVersions } from '../lib/compareVersions';

const prepareChangelogData = (data) =>
  [...data]
    .sort((a, b) => compareVersions(a.value, b.value))
    .map((option, index) => ({
      ...option,
      id: `version-${option.value}`,
      isSelected: index === 0,
    }));

export { prepareChangelogData };
