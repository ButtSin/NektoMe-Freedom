import { browserApi } from '@/shared/config/browser';

import { DEFAULT_SETTINGS, SETTINGS_IDS, STORAGE_KEYS } from '../config/settings';

class SettingsManager {
  _setSetting = (storageType, key, value) => {
    const storage =
      storageType === 'session' ? browserApi.storage.session : browserApi.storage.local;

    key = typeof key === 'string' ? key : String(key);

    return new Promise((resolve, reject) => {
      storage.set({ [key]: value }, () => {
        browserApi.runtime.lastError
          ? reject(new Error(browserApi.runtime.lastError.message))
          : resolve();
      });
    });
  };

  _getSetting = (storageType, key) => {
    const storage =
      storageType === 'session' ? browserApi.storage.session : browserApi.storage.local;

    key = typeof key === 'string' ? key : String(key);

    return new Promise((resolve, reject) => {
      storage.get(key, (result) => {
        browserApi.runtime.lastError
          ? reject(new Error(browserApi.runtime.lastError.message))
          : resolve(result[key]);
      });
    });
  };

  _getSessionTabsState = async (currentTabs) => {
    const state = await this._getSetting('session', STORAGE_KEYS.ui.tabsState);
    return state?.[currentTabs] ?? DEFAULT_SETTINGS[currentTabs];
  };

  _setSessionTabsState = async (currentTabs, tabStateValue) => {
    const state = (await this._getSetting('session', STORAGE_KEYS.ui.tabsState)) || {};

    const newState = {
      ...state,
      [currentTabs]: tabStateValue,
    };
    await this._setSetting('session', STORAGE_KEYS.ui.tabsState, newState);
  };

  _getLocalTheme = async () => {
    return await this._getSetting('local', STORAGE_KEYS.ui.theme);
  };

  _setLocalTheme = async (themeValue) => {
    await this._setSetting('local', STORAGE_KEYS.ui.theme, themeValue);
  };

  _getLocalSexFieldUnlocked = async () => {
    return await this._getSetting('local', STORAGE_KEYS.content.sexFieldUnlocked);
  };

  _setLocalSexFieldUnlocked = async (sexFieldUnlockedValue) => {
    return await this._setSetting(
      'local',
      STORAGE_KEYS.content.sexFieldUnlocked,
      sexFieldUnlockedValue,
    );
  };

  _getLocalCopyUnlocked = async () => {
    return await this._getSetting('local', STORAGE_KEYS.content.copyUnlocked);
  };

  _setLocalCopyUnlocked = async (copyUnlockedValue) => {
    return await this._setSetting('local', STORAGE_KEYS.content.copyUnlocked, copyUnlockedValue);
  };

  _getLocalAdvicesUnlocked = async () => {
    return await this._getSetting('local', STORAGE_KEYS.ui.advices);
  };

  _setLocalAdviceUnlocked = async (adviceUnlockedValue) => {
    return await this._setSetting('local', STORAGE_KEYS.ui.advices, adviceUnlockedValue);
  };

  _getSetterById = (id, tabsId) => {
    const setterById = {
      [SETTINGS_IDS.theme]: this._setLocalTheme,
      [SETTINGS_IDS.tabs]: (value) => this._setSessionTabsState(tabsId, value),
      [SETTINGS_IDS.sexFieldUnlocked]: this._setLocalSexFieldUnlocked,
      [SETTINGS_IDS.copyUnlocked]: this._setLocalCopyUnlocked,
      [SETTINGS_IDS.advices]: this._setLocalAdviceUnlocked,
    };

    return setterById[id];
  };

  _getGetterById = (id, tabsId) => {
    const gettersById = {
      [SETTINGS_IDS.theme]: this._getLocalTheme,
      [SETTINGS_IDS.tabs]: () => this._getSessionTabsState(tabsId),
      [SETTINGS_IDS.sexFieldUnlocked]: this._getLocalSexFieldUnlocked,
      [SETTINGS_IDS.copyUnlocked]: this._getLocalCopyUnlocked,
      [SETTINGS_IDS.advices]: this._getLocalAdvicesUnlocked,
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

  initAllLocalSettings = async () => {
    await Promise.all([
      this._getLocalTheme(),
      this._getLocalSexFieldUnlocked(),
      this._getLocalCopyUnlocked(),
      this._getLocalAdvicesUnlocked(),
    ]);
  };
}

export { SettingsManager };
