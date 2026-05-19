import settingsManager from "@/js/settingsManager";

export class CopyUnlocker {
  selectors = {
    sendButtonClass: ".sendMessageBtn",
  };

  constructor() {
    this.restrictedEvents = ["copy", "cut"];

    this.copyUnlocked = null;
  }

  static async create() {
    const copyUnlocker = new CopyUnlocker();
    await copyUnlocker.init();

    return copyUnlocker;
  }

  async init() {
    await this.initState();

    this.bindEvents();
  }

  async initState() {
    this.copyUnlocked = await settingsManager.getLocalCopyUnlocked();

    if (this.copyUnlocked === undefined) {
      this.copyUnlocked = settingsManager.getDefaultSettings().copyUnlocked;
    }

    this.boundOnAnyRestrictedEvent = this.onAnyRestrictedEvent.bind(this);
  }

  onChromeStorageChange(event) {
    const copyChange = event[settingsManager.keys.common.copyUnlocked];

    if (!copyChange) return;

    this.copyUnlocked = copyChange.newValue;

    this.toggleRestrictedListeners(this.copyUnlocked);
  }

  toggleRestrictedListeners(shouldAdd) {
    const action = shouldAdd ? "addEventListener" : "removeEventListener";

    this.restrictedEvents.forEach((event) => {
      document[action](event, this.boundOnAnyRestrictedEvent, true);
    });
  }

  onAnyRestrictedEvent(event) {
    event.stopImmediatePropagation();
  }

  bindEvents() {
    chrome.storage.onChanged.addListener((changes) =>
      this.onChromeStorageChange(changes),
    );

    if (!this.copyUnlocked) return;

    this.restrictedEvents.forEach((event) => {
      document.addEventListener(event, this.boundOnAnyRestrictedEvent, true);
    });
  }
}
