import { browserApi } from '../config/browser';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../config/settings';

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

  getDefaultSettings = () => DEFAULT_SETTINGS;

  getSessionTabsState = async (currentTabs) => {
    const state = await this._getSetting('session', STORAGE_KEYS.ui.tabsState);
    return state?.[currentTabs] ?? DEFAULT_SETTINGS.tabsState[currentTabs];
  };

  setSessionTabsState = async (currentTabs, tabStateValue) => {
    const state = (await this._getSetting('session', STORAGE_KEYS.ui.tabsState)) || {};

    const newState = {
      ...state,
      [currentTabs]: tabStateValue,
    };
    await this._setSetting('session', STORAGE_KEYS.ui.tabsState, newState);
  };

  getLocalTheme = async () => {
    return await this._getSetting('local', STORAGE_KEYS.ui.theme);
  };

  setLocalTheme = async (themeValue) => {
    await this._setSetting('local', STORAGE_KEYS.ui.theme, themeValue);
  };

  getLocalSexFieldUnlocked = async () => {
    return await this._getSetting('local', STORAGE_KEYS.content.sexFieldUnlocked);
  };

  setLocalSexFieldUnlocked = async (sexFieldUnlockedValue) => {
    return await this._setSetting(
      'local',
      STORAGE_KEYS.content.sexFieldUnlocked,
      sexFieldUnlockedValue,
    );
  };

  getLocalCopyUnlocked = async () => {
    return await this._getSetting('local', STORAGE_KEYS.content.copyUnlocked);
  };

  setLocalCopyUnlocked = async (copyUnlockedValue) => {
    return await this._setSetting('local', STORAGE_KEYS.content.copyUnlocked, copyUnlockedValue);
  };

  getLocalAdvicesUnlocked = async () => {
    return await this._getSetting('local', STORAGE_KEYS.ui.advices);
  };

  setLocalAdviceUnlocked = async (adviceUnlockedValue) => {
    return await this._setSetting('local', STORAGE_KEYS.ui.advices, adviceUnlockedValue);
  };

  initAllLocalSettings = async () => {
    const { theme, sexFieldUnlocked, copyUnlocked, advices } = this.getDefaultSettings();

    const [themeRes, sexRes, copyRes, adviceRes] = await Promise.all([
      this.getLocalTheme(),
      this.getLocalSexFieldUnlocked(),
      this.getLocalCopyUnlocked(),
      this.getLocalAdvicesUnlocked(),
    ]);

    if (themeRes === undefined) await this.setLocalTheme(theme);
    if (sexRes === undefined) await this.setLocalSexFieldUnlocked(sexFieldUnlocked);
    if (copyRes === undefined) await this.setLocalCopyUnlocked(copyUnlocked);
    if (adviceRes === undefined) await this.setLocalAdviceUnlocked(advices);
  };
}

export { SettingsManager };
