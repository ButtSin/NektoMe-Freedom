import { SETTINGS_IDS } from './model/settingsIds';
import { SettingsManager } from './model/SettingsManager.js';
import { ThemeContext } from './model/ThemeContext';

const settingsManager = new SettingsManager();

export { SETTINGS_IDS, settingsManager, ThemeContext };
