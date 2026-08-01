const DEFAULT_SETTINGS = Object.freeze({
  theme: 'system',
  popupMainTabs: 'settings',
  sexFieldUnlocked: true,
  copyUnlocked: true,
  advices: true,
});

const STORAGE_KEYS = Object.freeze({
  ui: {
    theme: 'theme',
    tabsState: 'tabsState',
    advices: 'advices',
  },

  content: {
    sexFieldUnlocked: 'sexFieldUnlocked',
    copyUnlocked: 'copyUnlocked',
  },
});

const SETTINGS_IDS = {
  theme: 'theme',
  tabs: 'tabs',
  sexFieldUnlocked: 'sexFieldUnlocked',
  copyUnlocked: 'copyUnlocked',
  advices: 'advices',
};

export { DEFAULT_SETTINGS, SETTINGS_IDS, STORAGE_KEYS };
