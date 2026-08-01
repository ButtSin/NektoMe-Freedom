import { SETTINGS_IDS } from './config/constants';
import { SettingsManager } from './model/SettingsManager.js';

const settingsManager = new SettingsManager();

export { SETTINGS_IDS, settingsManager };
