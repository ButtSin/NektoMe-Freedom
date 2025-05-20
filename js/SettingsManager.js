class SettingsManager {
  keys = {
    popup: {
      theme: 'theme',
    },
    
    common: {
      copyUnlocked: 'copyUnlocked',
      sexFieldUnlocked: 'sexFieldUnlocked',
    },
  }

  _setSetting(storageType, key, value) {
    const storage = storageType === 'session' 
    ? chrome.storage.session 
    : chrome.storage.local;
    
    key = typeof key === 'string' ? key : String(key); 

    return new Promise((resolve, reject) => {
      storage.set({[key]: value}, () => {
        chrome.runtime.lastError
          ? reject(new Error(chrome.runtime.lastError.message))
          : resolve();
      });
    });
  }

  _getSetting(storageType, key) {
    const storage = storageType === 'session' 
    ? chrome.storage.session 
    : chrome.storage.local;

    key = typeof key === 'string' ? key : String(key); 

    return new Promise((resolve, reject) => {
      storage.get(key, (result) => {
        chrome.runtime.lastError
          ? reject(new Error(chrome.runtime.lastError.message))
          : resolve(result[key]);
      });
    });
  }

  
  
  setLocalTheme(themeValue) {
    return this._setSetting('local', this.keys.popup.theme, themeValue);
  }
   
  getLocalTheme() {
    return this._getSetting('local', this.keys.popup.theme);
  }

  setSessionTabState(tabStateValue, currentTab) {
    return this._setSetting('session', currentTab, tabStateValue);    
  }

  getSessionTabState(currentTab) {
    return this._getSetting('session', currentTab);
  }

  setLocalCopyUnlocked(copyUnlockedValue) {
    return this._setSetting('local', this.keys.common.copyUnlocked, 
      copyUnlockedValue);
  }

  getLocalCopyUnlocked() {
    return this._getSetting('local', this.keys.common.copyUnlocked);
  }

  setLocalSexFieldUnlocked(sexFieldUnlockedValue) {
    return this._setSetting('local', this.keys.common.sexFieldUnlocked, 
      sexFieldUnlockedValue);
  }

  getLocalSexFieldUnlocked() {
    return this._getSetting('local', this.keys.common.sexFieldUnlocked);
  }

  getDefaultSettings() {
    return {
      sexFieldUnlocked: true,
      copyUnlocked: true,
    }
  }
}

export default SettingsManager;