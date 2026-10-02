import { compareVersions } from '../lib/compareVersions';

const prepareChangelogData = (data) => [...data].sort((a, b) => compareVersions(a.value, b.value));

export { prepareChangelogData };
