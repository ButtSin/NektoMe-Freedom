import { browserApi } from '../config/browser';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../config/settings';

class SettingsManager {
  _setSetting(storageType, key, value) {
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
  }

  _getSetting(storageType, key) {
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
  }

  getDefaultSettings() {
    return DEFAULT_SETTINGS;
  }

  async getSessionTabsState(currentTabs) {
    const state = await this._getSetting('session', STORAGE_KEYS.ui.tabsState);
    return state?.[currentTabs] ?? DEFAULT_SETTINGS.tabsState[currentTabs];
  }

  async setSessionTabsState(currentTabs, tabStateValue) {
    const state = (await this._getSetting('session', STORAGE_KEYS.ui.tabsState)) || {};

    const newState = {
      ...state,
      [currentTabs]: tabStateValue,
    };
    await this._setSetting('session', STORAGE_KEYS.ui.tabsState, newState);
  }

  async setLocalTheme(themeValue) {
    await this._setSetting('local', STORAGE_KEYS.ui.theme, themeValue);
  }

  async getLocalTheme() {
    const state = await this._getSetting('local', STORAGE_KEYS.ui.theme);
    return state ?? DEFAULT_SETTINGS.theme;
  }

  // async loadAllLocalSettings() {
  //   const defaultSettings = this.getDefaultSettings();

  //   const [themeRes, sexRes, copyRes] = await Promise.allSettled([
  //     this.getLocalTheme(),
  //     this.getLocalSexFieldUnlocked(),
  //     this.getLocalCopyUnlocked(),
  //   ]);

  //   if (themeRes.status === "fulfilled") {
  //     this._theme.value = themeRes.value ?? defaultSettings.theme;
  //   } else {
  //     console.warn("Failed to load theme, using default:", themeRes.reason);
  //     this._theme.value = defaultSettings.theme;
  //   }

  //   if (sexRes.status === "fulfilled") {
  //     this._sexFieldUnlocked.value =
  //       sexRes.value ?? defaultSettings.sexFieldUnlocked;
  //   } else {
  //     console.warn(
  //       "Failed to load sexFieldUnlocked, using default:",
  //       sexRes.reason,
  //     );
  //     this._sexFieldUnlocked.value = defaultSettings.sexFieldUnlocked;
  //   }

  //   if (copyRes.status === "fulfilled") {
  //     this._copyUnlocked.value = copyRes.value ?? defaultSettings.copyUnlocked;
  //   } else {
  //     console.warn(
  //       "Failed to load copyUnlocked, using default:",
  //       copyRes.reason,
  //     );
  //     this._copyUnlocked.value = defaultSettings.copyUnlocked;
  //   }
  // }

  // setLocalCopyUnlocked(copyUnlockedValue) {
  //   return this._setSetting(
  //     "local",
  //     STORAGE_KEYS.content.copyUnlocked,
  //     copyUnlockedValue,
  //   );
  // }

  // setLocalSexFieldUnlocked(sexFieldUnlockedValue) {
  //   return this._setSetting(
  //     "local",
  //     STORAGE_KEYS.content.sexFieldUnlocked,
  //     sexFieldUnlockedValue,
  //   );
  // }

  getLocalSexFieldUnlocked() {
    return this._getSetting('local', STORAGE_KEYS.content.sexFieldUnlocked);
  }

  getLocalCopyUnlocked() {
    return this._getSetting('local', STORAGE_KEYS.content.copyUnlocked);
  }
}

export { SettingsManager };
