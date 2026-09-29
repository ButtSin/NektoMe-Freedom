import { SETTINGS_IDS } from './settingsIds';

const DEFAULT_SETTINGS = Object.freeze({
  [SETTINGS_IDS.theme]: 'system',
  [SETTINGS_IDS.sexFieldUnlocked]: true,
  [SETTINGS_IDS.copyUnlocked]: true,
  [SETTINGS_IDS.advices]: true,

  [SETTINGS_IDS.popupMainTabs]: 'settings',
});

export { DEFAULT_SETTINGS };
