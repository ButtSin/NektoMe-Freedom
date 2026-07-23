const manifest = chrome.runtime.getManifest();

const extensionName = manifest.extensionName;
const extensionVersion = manifest.version;
const isThemeChangingProvide = Symbol('isThemeChanging');
const THEME_TRANSITION_DURATION = 300;

export { extensionName, extensionVersion, isThemeChangingProvide, THEME_TRANSITION_DURATION };
