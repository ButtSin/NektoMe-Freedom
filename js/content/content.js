//Данный файл нельзя сделать модулем, поэтому и импорты не работают. Пока я не 
//изучил сборщик, приходится дублировать все нужные классы здесь.
class SettingsManager {
  keys = {
    popup: {
      theme: 'theme',
    },
    
    common: {
      copyUnlocked: 'copyUnlocked',
      sexFieldUnlocked: 'sexFieldUnlocked',
    },
  }

  _setSetting(storageType, key, value) {
    const storage = storageType === 'session' 
    ? chrome.storage.session 
    : chrome.storage.local;
    
    key = typeof key === 'string' ? key : String(key); 

    return new Promise((resolve, reject) => {
      storage.set({[key]: value}, () => {
        chrome.runtime.lastError
          ? reject(new Error(chrome.runtime.lastError.message))
          : resolve();
      });
    });
  }

  _getSetting(storageType, key) {
    const storage = storageType === 'session' 
    ? chrome.storage.session 
    : chrome.storage.local;

    key = typeof key === 'string' ? key : String(key); 

    return new Promise((resolve, reject) => {
      storage.get(key, (result) => {
        chrome.runtime.lastError
          ? reject(new Error(chrome.runtime.lastError.message))
          : resolve(result[key]);
      });
    });
  }

  
  
  setLocalTheme(themeValue) {
    return this._setSetting('local', this.keys.popup.theme, themeValue);
  }
   
  getLocalTheme() {
    return this._getSetting('local', this.keys.popup.theme);
  }

  setSessionTabState(tabStateValue, currentTab) {
    return this._setSetting('session', currentTab, tabStateValue);    
  }

  getSessionTabState(currentTab) {
    return this._getSetting('session', currentTab);
  }

  setLocalCopyUnlocked(copyUnlockedValue) {
    return this._setSetting('local', this.keys.common.copyUnlocked, 
      copyUnlockedValue);
  }

  getLocalCopyUnlocked() {
    return this._getSetting('local', this.keys.common.copyUnlocked);
  }

  setLocalSexFieldUnlocked(sexFieldUnlockedValue) {
    return this._setSetting('local', this.keys.common.sexFieldUnlocked, 
      sexFieldUnlockedValue);
  }

  getLocalSexFieldUnlocked() {
    return this._getSetting('local', this.keys.common.sexFieldUnlocked);
  }

  getDefaultSettings() {
    return {
      sexFieldUnlocked: true,
      copyUnlocked: true,
    }
  }
}

const settingsManager = new SettingsManager();

class ErrorHandlers {
  _onPromiseGlobalError(event) {
    alert('Произошла ошибка обработки асинхронного кода. ' + 
      'Расширение может начать работать некорректо.');
    console.error('Nekto Me Plus. Unhandled Promise Rejection: ', 
      event.reason);
    
    event.preventDefault();
  }

  promiseGlobalErrorSetup() {
    window.addEventListener('unhandledrejection', this._onPromiseGlobalError);
  }
}

// new ErrorHandlers().promiseGlobalErrorSetup();

////////////////////////////////////////////////////////////////////////////////

class SexFieldUnlocker {
  selectors = {
    sexFieldClass: '.sexRow',
    buttonsClass: '.btn',
    buttonBaseClass: 'btn',   
    searchButtonID: '#searchCompanyBtn',
  }

  stateClasses = {
    checked: 'checked',
    disabled: 'disabled',
    buttonRadio: 'btnradio',
  }

  constructor() {
    this.searchButtonElement = null;
    this.sexFieldElement = null;
    this.sexButtonElements = null;
    this.ownSexButtonElements = null;
    this.companionSexButtonElements = null;
    this.isInCommunicationTopic = null;

    this.isFirstUpdate = true;

    this.ownSexState = null;
    this.companionSexState = null;

    this.observerConfig = {
      childList: true,
      subtree: true
    };
    this.observerNode = document.body;
    this.sexFieldUnlockObserver = null;
    this.observerCallback = null;

    this.sexFieldUnlocked = null;

    this.boundOnSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.boundOnSexFieldClick = this.onSexFieldClick.bind(this);
    this.boundOnChromeStorageChange = this.onChromeStorageChange.bind(this);
  }

  static async create() {
    const sexFieldUnlocker = new SexFieldUnlocker();
    await sexFieldUnlocker.init();
    
    return sexFieldUnlocker;
  }

  async init() {
    await this.initState();

    this.bindEvents();
  }

  async initState() {
    this.sexFieldUnlocked = await settingsManager.getLocalSexFieldUnlocked();

    if (this.sexFieldUnlocked === undefined) {
      this.sexFieldUnlocked = settingsManager.getDefaultSettings().
        sexFieldUnlocked;
    }

    this.sexFieldUnlockObserver = this.getSexFieldUnlockObserver();
    await this.initSexFieldUnlockObserver();
  }

  getSexFieldUnlockObserver() {
    this.observerCallback = () => {
      let search = document.querySelector(this.selectors.searchButtonID);
      if (search) this.searchButtonElement = search;

      let field = document.querySelector(this.selectors.sexFieldClass);
      if (field) {
        this.setupSexFieldElements(field);

        if (this.isFirstUpdate) {
          this.saveButtonStates();
          this.isFirstUpdate = false;
        }

        if (!this.isInCommunicationTopic) {
          this.enableButtons(this.sexButtonElements);
        } 
        
        this.adjustCommunicationButtons();
  
        this.updateUI();
      }

      if (this.searchButtonElement && this.sexFieldElement) {
        this.bindEvents();
        
        this.observerPromiseResolve?.();
        this.observerPromiseResolve = null;
      }
    };

    return new MutationObserver(this.observerCallback);
  }

  setupSexFieldElements(main) {
    const MIN_COMMUNICATION_TOPIC_BUTTONS = 4;

    this.sexFieldElement = main ?? document.querySelector(
      this.selectors.sexFieldClass);
    this.sexButtonElements = Array.from(
      this.sexFieldElement.querySelectorAll(this.selectors.buttonsClass));
    this.isInCommunicationTopic = this.sexButtonElements.length > 
      MIN_COMMUNICATION_TOPIC_BUTTONS;
    this.ownSexButtonElements = this.sexButtonElements.slice(
      0, this.sexButtonElements.length / 2);
    this.companionSexButtonElements = this.sexButtonElements.slice(
      -1 * this.sexButtonElements.length / 2);
  }


  async initSexFieldUnlockObserver() {
    return new Promise(resolve => {
      if (!this.sexFieldUnlocked) {
        resolve();
        return;
      }

      if (this.observerNode) {
        this.observerPromiseResolve = resolve;
        this.sexFieldUnlockObserver.observe(this.observerNode, 
          this.observerConfig);
      } else {
        this.showObserverAlert();
        resolve();  
      }
    });
  }

  saveButtonStates() {
    const startIndex = this.isInCommunicationTopic ? 1 : 0;

    this.ownSexState = this.ownSexButtonElements.slice(startIndex).map(
      button => button.classList.contains(this.stateClasses.checked));
    
    this.companionSexState = this.companionSexButtonElements.
      slice(startIndex).map(button => button.classList.contains(
        this.stateClasses.checked));
  }

  setButtonStates(button) {
    const isOwn = this.ownSexButtonElements.includes(button);
    const buttons = isOwn ? this.ownSexButtonElements : 
      this.companionSexButtonElements;
    const states = isOwn ? this.ownSexState : 
      this.companionSexState;
    
    const originalIndex = buttons.indexOf(button);
    const indexOffset = this.isInCommunicationTopic ? 1 : 0; 
    const adjustedIndex = originalIndex - indexOffset; 
    
    const resetStates = (target = states) => target.fill(false);
    
    if (!this.isInCommunicationTopic) {
      resetStates();
      states[adjustedIndex] = true;
      return;
    }
  
    if (isOwn) {
      this.ownSexState[adjustedIndex] = true;

      switch(originalIndex) {
        case 0:
          this.ownSexState.fill(false);
          this.companionSexState.fill(false); 
          this.companionSexButtonElements[0].classList.add(
            this.stateClasses.checked);
          break;
        case 1:
        case 2:
          this.ownSexState.fill(false);
          this.ownSexState[adjustedIndex] = true;
          break;
      }
    } else {
      this.companionSexState[adjustedIndex] = true;

      switch(originalIndex) {
        case 0:
          this.companionSexState.fill(false); 
          this.companionSexButtonElements[0].classList.add(
            this.stateClasses.checked);
          break;
        case 1:
        case 2:
          this.companionSexState.fill(false); 
          this.companionSexState[adjustedIndex] = true;
          break;
      }
    }
  }

  enableButtons(buttons) {
    buttons.forEach(button => button.classList.remove(
      this.stateClasses.disabled));
  }

  disableButtons(buttons) {
    buttons.forEach(button => button.classList.add(
      this.stateClasses.disabled));
  }
  
  resetCompanionButtons() {
    if (this.isInCommunicationTopic) return;

    this.disableButtons(this.companionSexButtonElements);

    for (let button of this.companionSexButtonElements) {
      button.classList.remove(this.stateClasses.checked);
    }

    if (this.ownSexState[0]) {
      this.companionSexButtonElements[1].classList.add(
        this.stateClasses.checked);
      this.companionSexButtonElements[0].classList.remove(
        this.stateClasses.checked);
    }

    if (this.ownSexState[1]) {
      this.companionSexButtonElements[0].classList.add(
        this.stateClasses.checked);
      this.companionSexButtonElements[1].classList.remove(
        this.stateClasses.checked);
    }
  }

  adjustCommunicationButtons() {
    const isCommunicationUpdate = this.isInCommunicationTopic && 
      !this.isFirstUpdate;
    const ownButtonSomeoneChecked = this.ownSexButtonElements[0].
      classList.contains(this.stateClasses.checked);
    const hasCompanionSelection = this.companionSexState[0] || 
      this.companionSexState[1];

    if (isCommunicationUpdate) {
      if (!ownButtonSomeoneChecked && hasCompanionSelection) {
        this.companionSexButtonElements[0].classList.remove(
          this.stateClasses.checked);
      }
      
      if (ownButtonSomeoneChecked && hasCompanionSelection) {
        this.companionSexState.fill(false);
        this.disableButtons(this.companionSexButtonElements);
      }

      if (ownButtonSomeoneChecked && !hasCompanionSelection) {
        this.disableButtons(this.companionSexButtonElements);
      }
    }
  }

  updateUI() {
    const startIndex = this.isInCommunicationTopic ? 1 : 0;

    this.ownSexButtonElements.slice(startIndex).forEach((button, index) => 
      button.classList.toggle(this.stateClasses.checked, 
        this.ownSexState[index]));
    
    this.companionSexButtonElements.slice(startIndex).forEach((button, index) => 
      button.classList.toggle(this.stateClasses.checked, 
        this.companionSexState[index]));
  }

  syncRequestStateBeforeSubmit() {
    for (let button of this.companionSexButtonElements) {
      if (button.classList.contains(this.stateClasses.checked)) {
        button.dispatchEvent(new Event('click'));
      }
    }
  }

  showSexSelectionAlert() {
    const hasOwnSelection = this.ownSexState[0] || 
      this.ownSexState[1]; 

    const alertMessage = hasOwnSelection ? 'Укажите пол собеседника.' : 
      'Укажите ваш пол и пол вашего собеседника.';
    const alertHtml = this.getAlertHtml(alertMessage);

    document.body.insertAdjacentHTML('afterend', alertHtml);
    document.querySelector('#custom-alert .swal2-confirm').addEventListener(
      'click', () => document.getElementById('custom-alert').remove());
  }

  showObserverAlert() {
    const alertMessage = 'Произошла ошибка инициализации расширения +' + 
      '«NektoMe Freedom». Попробуйте перезагрузить страницу';
    const alertHtml = this.getAlertHtml(alertMessage);

    document.body.insertAdjacentHTML('afterend', alertHtml);
    document.querySelector('#custom-alert .swal2-confirm').addEventListener(
      'click', () => document.getElementById('custom-alert').remove());
  }

  getAlertHtml(alertMessage='Наверное, что-то случилось.') {
    return `
      <div id='custom-alert' 
          class='swal2-container swal2-center swal2-fade swal2-shown'
          style='overflow-y: auto;'>
        <div class='swal2-popup swal2-modal swal2-show' 
            tabindex='-1' 
            role='dialog' 
            aria-modal='true' 
            style='display: flex;'>
          <div class='swal2-header'>
            <h2 class='swal2-title'>${alertMessage}</h2>
          </div>
          <div class='swal2-actions' style='display: flex;'>
            <button type='button' 
                    class='swal2-confirm swal2-styled confirm-alert-button' 
                    aria-label='OK'
                    style='background-color: #6ac065;'>
              OK
            </button>
          </div>
        </div>
      </div>
    `;
  }

  onSexFieldClick(event) {  
    if (!event.target.classList.contains(this.selectors.buttonBaseClass)) 
      return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (!this.isInCommunicationTopic) {
      this.enableButtons(this.sexButtonElements);
    }

    this.setButtonStates(event.target);
    this.updateUI();
    this.saveButtonStates();
  }

  onSearchButtonClick(event) {
    const hasNoCompanionSelection = !this.companionSexState[0] && 
      !this.companionSexState[1];

    if (!this.isInCommunicationTopic && hasNoCompanionSelection) {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.showSexSelectionAlert();

      return;
    }

    this.syncRequestStateBeforeSubmit();
  }

  onChromeStorageChange(event) {
    const sexFieldChange = event[
      settingsManager.keys.common.sexFieldUnlocked];

    if (!sexFieldChange) return;

    this.sexFieldUnlocked = sexFieldChange.newValue;

    if (this.sexFieldUnlocked) {
      this.searchButtonElement = document.querySelector(
        this.selectors.searchButtonID);

      this.setupSexFieldElements();

      if (!this.isInCommunicationTopic) {
        this.enableButtons(this.sexButtonElements);
      }

      this.saveButtonStates();
      this.updateUI();

      this.sexFieldUnlockObserver.observe(this.observerNode, 
        this.observerConfig);
      this.searchButtonElement.addEventListener('click', 
        this.boundOnSearchButtonClick, true);
      this.sexFieldElement.addEventListener('click', 
        this.boundOnSexFieldClick);

      this.bindEvents();
    } else {
      if (!this.isInCommunicationTopic) {
        this.saveButtonStates();
      }
 
      this.sexFieldUnlockObserver.disconnect();
      this.searchButtonElement.removeEventListener('click', 
        this.boundOnSearchButtonClick);
      this.sexFieldElement.removeEventListener('click', 
        this.boundOnSexFieldClick);
      this.resetCompanionButtons();
    }
  }

  bindEvents() {
    chrome.storage.onChanged.addListener(this.boundOnChromeStorageChange);

    if (!this.sexFieldUnlocked) return;
      
    this.searchButtonElement.addEventListener('click', 
        this.boundOnSearchButtonClick, true);

    this.sexFieldElement.addEventListener('click', this.boundOnSexFieldClick);
  }
}

SexFieldUnlocker.create();

class CopyUnlocker {
  selectors = {
    sendButtonClass: ".sendMessageBtn",
  }

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
      this.copyUnlocked = settingsManager.getDefaultSettings().
        copyUnlocked;
    }

    this.boundOnAnyRestrictedEvent = this.onAnyRestrictedEvent.bind(this);
  }

  onChromeStorageChange(event) {
    const copyChange = event[
      settingsManager.keys.common.copyUnlocked];

    if (!copyChange) return;
    
    this.copyUnlocked = copyChange.newValue;

    this.toggleRestrictedListeners(this.copyUnlocked); 
  }

  toggleRestrictedListeners(shouldAdd) {
    const action = shouldAdd ? "addEventListener" : "removeEventListener";

    this.restrictedEvents.forEach(event => {
      document[action](event, this.boundOnAnyRestrictedEvent, true);
    });
  }
  
  onAnyRestrictedEvent(event) {
    event.stopImmediatePropagation();
  }

  bindEvents() {
    chrome.storage.onChanged.addListener(
      (changes) => this.onChromeStorageChange(changes));

    if (!this.copyUnlocked) return;

    this.restrictedEvents.forEach(event => {
      document.addEventListener(event, 
        this.boundOnAnyRestrictedEvent, true);
    });
  }
}

CopyUnlocker.create();