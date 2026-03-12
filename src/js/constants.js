/* eslint-disable no-undef */
const manifest = chrome.runtime.getManifest();
export const extensionVersion = manifest.version;

export const isThemeChangingProvide = Symbol('isThemeChanging');
