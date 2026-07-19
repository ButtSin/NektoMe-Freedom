const manifest = chrome.runtime.getManifest();

const extensionVersion = manifest.version;
const isThemeChangingProvide = Symbol("isThemeChanging");
const THEME_TRANSITION_DURATION = 300;

export { extensionVersion, isThemeChangingProvide, THEME_TRANSITION_DURATION };
