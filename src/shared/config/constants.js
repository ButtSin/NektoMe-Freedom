const manifest = chrome.runtime.getManifest();

const extensionName = manifest.name;
const extensionVersion = manifest.version;
const isThemeChangingProvide = Symbol('isThemeChanging');
const THEME_TRANSITION_DURATION = 250;
const utilClasses = {
  disableAnimation: 'disable-animation',
  hide: 'hide',
};
const themeClasses = {
  dark: 'is-dark',
  light: 'is-light',
};

export {
  extensionName,
  extensionVersion,
  isThemeChangingProvide,
  THEME_TRANSITION_DURATION,
  themeClasses,
  utilClasses,
};
