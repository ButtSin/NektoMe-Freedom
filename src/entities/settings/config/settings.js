const DEFAULT_SETTINGS = Object.freeze({
  theme: 'system',
  tabsState: {
    popupMainTabs: 'settings',
  },
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

export { DEFAULT_SETTINGS, STORAGE_KEYS };
