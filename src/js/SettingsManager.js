/* eslint-disable no-console */
/* eslint-disable no-undef */
import { ref } from 'vue';

class SettingsManager {
  _defaultSettings = Object.freeze({
    theme: 'system',
    sexFieldUnlocked: true,
    copyUnlocked: true,
  });

  _theme = ref(this._defaultSettings.theme);
  _sexFieldUnlocked = ref(this._defaultSettings.sexFieldUnlocked);
  _copyUnlocked = ref(this._defaultSettings.copyUnlocked);

  _keys = Object.freeze({
    ui: {
      theme: 'theme',
    },

    content: {
      copyUnlocked: 'copyUnlocked',
      sexFieldUnlocked: 'sexFieldUnlocked',
    },
  });

  getTheme() {
    return this._theme;
  }

  getSexFieldUnlocked() {
    return this._sexFieldUnlocked;
  }

  getCopyUnlocked() {
    return this._copyUnlocked;
  }

  _setSetting(storageType, key, value) {
    const storage = storageType === 'session' ? chrome.storage.session : chrome.storage.local;

    key = typeof key === 'string' ? key : String(key);

    return new Promise((resolve, reject) => {
      storage.set({ [key]: value }, () => {
        chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError.message)) : resolve();
      });
    });
  }

  _getSetting(storageType, key) {
    const storage = storageType === 'session' ? chrome.storage.session : chrome.storage.local;

    key = typeof key === 'string' ? key : String(key);

    return new Promise((resolve, reject) => {
      storage.get(key, (result) => {
        chrome.runtime.lastError
          ? reject(new Error(chrome.runtime.lastError.message))
          : resolve(result[key]);
      });
    });
  }

  async setLocalTheme(themeValue) {
    await this._setSetting('local', this._keys.ui.theme, themeValue);
    this._theme.value = themeValue;
  }

  async getLocalTheme() {
    return this._getSetting('local', this._keys.ui.theme);
  }

  getDefaultSettings() {
    return this._defaultSettings;
  }

  async loadAllSettings() {
    const defaultSettings = this.getDefaultSettings();

    const [themeRes, sexRes, copyRes] = await Promise.allSettled([
      this.getLocalTheme(),
      this.getLocalSexFieldUnlocked(),
      this.getLocalCopyUnlocked(),
    ]);

    if (themeRes.status === 'fulfilled') {
      this._theme.value = themeRes.value ?? defaultSettings.theme;
    } else {
      console.warn('Failed to load theme, using default:', themeRes.reason);
      this._theme.value = defaultSettings.theme;
    }

    if (sexRes.status === 'fulfilled') {
      this._sexFieldUnlocked.value = sexRes.value ?? defaultSettings.sexFieldUnlocked;
    } else {
      console.warn('Failed to load sexFieldUnlocked, using default:', sexRes.reason);
      this._sexFieldUnlocked.value = defaultSettings.sexFieldUnlocked;
    }

    if (copyRes.status === 'fulfilled') {
      this._copyUnlocked.value = copyRes.value ?? defaultSettings.copyUnlocked;
    } else {
      console.warn('Failed to load copyUnlocked, using default:', copyRes.reason);
      this._copyUnlocked.value = defaultSettings.copyUnlocked;
    }
  }

  setSessionTabState(tabStateValue, currentTab) {
    return this._setSetting('session', currentTab, tabStateValue);
  }

  getSessionTabState(currentTab) {
    return this._getSetting('session', currentTab);
  }

  setLocalCopyUnlocked(copyUnlockedValue) {
    return this._setSetting('local', this._keys.content.copyUnlocked, copyUnlockedValue);
  }

  getLocalCopyUnlocked() {
    return this._getSetting('local', this._keys.content.copyUnlocked);
  }

  setLocalSexFieldUnlocked(sexFieldUnlockedValue) {
    return this._setSetting('local', this._keys.content.sexFieldUnlocked, sexFieldUnlockedValue);
  }

  getLocalSexFieldUnlocked() {
    return this._getSetting('local', this._keys.content.sexFieldUnlocked);
  }
}

export default SettingsManager;
