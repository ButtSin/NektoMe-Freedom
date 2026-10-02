import { SETTINGS_IDS, settingsManager } from '@/entities/settings';

class CopyUnlocker {
  _restrictedEvents = ['copy', 'cut'];

  _copyUnlocked = null;
  _unsubscribeSetting = null;

  static async create() {
    const copyUnlocker = new CopyUnlocker();
    await copyUnlocker._init();

    return copyUnlocker;
  }

  _init = async () => {
    this._copyUnlocked = await settingsManager.getSettingValue(SETTINGS_IDS.copyUnlocked);

    this._bindEvents();
  };

  _onSettingsChange = (changes) => {
    const copyChange = changes[SETTINGS_IDS.copyUnlocked];

    if (!copyChange) return;

    this._copyUnlocked = copyChange.newValue;

    this._toggleRestrictedListeners(this._copyUnlocked);
  };

  _toggleRestrictedListeners = (shouldAdd) => {
    const action = shouldAdd ? 'addEventListener' : 'removeEventListener';

    this._restrictedEvents.forEach((event) => {
      document[action](event, this._onAnyRestrictedEvent, true);
    });
  };

  _onAnyRestrictedEvent = (event) => {
    event.stopImmediatePropagation();
  };

  _bindEvents = () => {
    this._unsubscribeSetting = settingsManager.subscribe(this._onSettingsChange);

    if (!this._copyUnlocked) return;

    this._restrictedEvents.forEach((event) => {
      document.addEventListener(event, this._onAnyRestrictedEvent, true);
    });
  };
}

export { CopyUnlocker };
