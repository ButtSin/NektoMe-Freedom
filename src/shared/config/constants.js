const manifest = chrome.runtime.getManifest();

const extensionName = manifest.name;
const extensionVersion = manifest.version;

const UTIL_CLASSES = {
  disableAnimation: 'disable-animation',
  hide: 'hide',
};
const THEME_CLASSES = {
  dark: 'is-dark',
  light: 'is-light',
};

const UI_EVENTS = {
  firstTabsUpdate: 'ui:first-tabs-update',
};

const TRANSITION_DURATION = 3500;

const adviceUrl = chrome.runtime.getURL('src/html/advices/index.html');

export {
  adviceUrl,
  extensionName,
  extensionVersion,
  THEME_CLASSES,
  TRANSITION_DURATION,
  UI_EVENTS,
  UTIL_CLASSES,
};
