import { browserApi } from '@/shared/lib/extension/browserApi';

import { STORAGE_KEYS } from './settingsStorageKeys';

const setSetting = (storageType, key, value) => {
  const storage = storageType === 'session' ? browserApi.storage.session : browserApi.storage.local;

  key = typeof key === 'string' ? key : String(key);

  return new Promise((resolve, reject) => {
    storage.set({ [key]: value }, () => {
      browserApi.runtime.lastError
        ? reject(new Error(browserApi.runtime.lastError.message))
        : resolve();
    });
  });
};

const getSetting = (storageType, key) => {
  const storage = storageType === 'session' ? browserApi.storage.session : browserApi.storage.local;

  key = typeof key === 'string' ? key : String(key);

  return new Promise((resolve, reject) => {
    storage.get(key, (result) => {
      browserApi.runtime.lastError
        ? reject(new Error(browserApi.runtime.lastError.message))
        : resolve(result[key]);
    });
  });
};

const getSessionTabsState = async (currentTabs) => {
  return (await getSetting('session', STORAGE_KEYS.ui.tabsState))?.[currentTabs];
};

const setSessionTabsState = async (currentTabs, tabStateValue) => {
  const state = (await getSetting('session', STORAGE_KEYS.ui.tabsState)) || {};

  const newState = {
    ...state,
    [currentTabs]: tabStateValue,
  };
  await setSetting('session', STORAGE_KEYS.ui.tabsState, newState);
};

const getLocalTheme = async () => {
  return await getSetting('local', STORAGE_KEYS.ui.theme);
};

const setLocalTheme = async (themeValue) => {
  await setSetting('local', STORAGE_KEYS.ui.theme, themeValue);
};

const getLocalSexFieldUnlocked = async () => {
  return await getSetting('local', STORAGE_KEYS.content.sexFieldUnlocked);
};

const setLocalSexFieldUnlocked = async (sexFieldUnlockedValue) => {
  return await setSetting('local', STORAGE_KEYS.content.sexFieldUnlocked, sexFieldUnlockedValue);
};

const getLocalCopyUnlocked = async () => {
  return await getSetting('local', STORAGE_KEYS.content.copyUnlocked);
};

const setLocalCopyUnlocked = async (copyUnlockedValue) => {
  return await setSetting('local', STORAGE_KEYS.content.copyUnlocked, copyUnlockedValue);
};

const getLocalAdvicesUnlocked = async () => {
  return await getSetting('local', STORAGE_KEYS.ui.advices);
};

const setLocalAdviceUnlocked = async (adviceUnlockedValue) => {
  return await setSetting('local', STORAGE_KEYS.ui.advices, adviceUnlockedValue);
};

const subscribeToSettings = (callback) => {
  browserApi.storage.onChanged.addListener(callback);
  return () => browserApi.storage.onChanged.removeListener(callback);
};

export {
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
  subscribeToSettings,
};
