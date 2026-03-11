/* eslint-disable no-console */
/* eslint-disable no-undef */
import { ref } from 'vue';

class SettingsManager {
  _defaultSettings = Object.freeze({
    theme: 'system',
    tabsState: {
      popupMainTabs: 'settings',
    },
    sexFieldUnlocked: true,
    copyUnlocked: true,
  });

  _keys = Object.freeze({
    ui: {
      theme: 'theme',
      tabsState: 'tabsState',
    },

    content: {
      sexFieldUnlocked: 'sexFieldUnlocked',
      copyUnlocked: 'copyUnlocked',
    },
  });

  _theme = ref(null);
  _tabsState = ref(null);
  _sexFieldUnlocked = ref(null);
  _copyUnlocked = ref(null);

  getTheme() {
    return this._theme;
  }

  getSexFieldUnlocked() {
    return this._sexFieldUnlocked;
  }

  getCopyUnlocked() {
    return this._copyUnlocked;
  }

  getTabsState() {
    return this._tabsState;
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
    return await this._getSetting('local', this._keys.ui.theme);
  }

  async initSessionTabsState() {
    const savedTabsSession = await this._getSetting('session', this._keys.ui.tabsState);

    if (savedTabsSession) {
      this._tabsState.value = {
        ...this._defaultSettings.tabsState,
        ...savedTabsSession,
      };

      return;
    }

    this._tabsState.value = { ...this._defaultSettings.tabsState };
    await this._setSetting('session', this._keys.ui.tabsState, this._tabsState.value);
  }

  async setSessionTabsState(currentTabs, tabStateValue) {
    this._tabsState.value = {
      ...this._tabsState.value,
      [currentTabs]: tabStateValue,
    };

    await this._setSetting('session', this._keys.ui.tabsState, this._tabsState.value);
  }

  async getSessionTabsState(currentTabs) {
    const currentState = await this._getSetting('session', this._keys.ui.tabsState);
    return currentState[currentTabs];
  }

  getDefaultSettings() {
    return this._defaultSettings;
  }

  async loadAllLocalSettings() {
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

export default new SettingsManager();
