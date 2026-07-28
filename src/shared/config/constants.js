const manifest = chrome.runtime.getManifest();

const extensionName = manifest.name;
const extensionVersion = manifest.version;

const utilClasses = {
  disableAnimation: 'disable-animation',
  hide: 'hide',
};
const themeClasses = {
  dark: 'is-dark',
  light: 'is-light',
};

const adviceUrl = chrome.runtime.getURL('src/html/advices/index.html');

export { adviceUrl, extensionName, extensionVersion, themeClasses, utilClasses };
