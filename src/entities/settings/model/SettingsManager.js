import {
  getLocalAdvicesUnlocked,
  getLocalCopyUnlocked,
  getLocalSexFieldUnlocked,
  getLocalTheme,
  getSessionTabsState,
  setLocalAdviceUnlocked,
  setLocalCopyUnlocked,
  setLocalSexFieldUnlocked,
  setLocalTheme,
  setSessionTabsState,
} from '../api/settingsRepository.js';

import { DEFAULT_SETTINGS } from './settingsDefaults';
import { SETTINGS_IDS } from './settingsIds';

class SettingsManager {
  _getSetterById = (id, tabsId) => {
    const setterById = {
      [SETTINGS_IDS.theme]: setLocalTheme,
      [SETTINGS_IDS.tabs]: (value) => setSessionTabsState(tabsId, value),
      [SETTINGS_IDS.sexFieldUnlocked]: setLocalSexFieldUnlocked,
      [SETTINGS_IDS.copyUnlocked]: setLocalCopyUnlocked,
      [SETTINGS_IDS.advices]: setLocalAdviceUnlocked,
    };

    return setterById[id];
  };

  _getGetterById = (id, tabsId) => {
    const gettersById = {
      [SETTINGS_IDS.theme]: getLocalTheme,
      [SETTINGS_IDS.tabs]: () => getSessionTabsState(tabsId),
      [SETTINGS_IDS.sexFieldUnlocked]: getLocalSexFieldUnlocked,
      [SETTINGS_IDS.copyUnlocked]: getLocalCopyUnlocked,
      [SETTINGS_IDS.advices]: getLocalAdvicesUnlocked,
    };

    return gettersById[id];
  };

  setSettingValue = async (id, value, tabsKey) => {
    await this._getSetterById(id, tabsKey)(value);
  };

  getSettingValue = async (id, tabsKey) => {
    const defaultSetting = tabsKey ? DEFAULT_SETTINGS[tabsKey] : DEFAULT_SETTINGS[id];

    return (await this._getGetterById(id, tabsKey)()) ?? defaultSetting;
  };
}

export { SettingsManager };
