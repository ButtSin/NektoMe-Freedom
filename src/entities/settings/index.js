import { SETTINGS_IDS } from './config/settings';
import { SettingsManager } from './model/SettingsManager.js';

const settingsManager = new SettingsManager();

export { SETTINGS_IDS, settingsManager };
