import { SETTINGS_IDS, settingsManager } from '@/entities/settings';
import { getAlertHtml } from '@/features/sex-field-unlock/lib/dom/getAlertHtml';

import { selectors, stateClasses } from '../config/constants';
import { disableButtons, enableButtons } from '../lib/dom/button-utils';

class SexFieldUnlocker {
  _searchButtonElement = null;
  _sexFieldElement = null;
  _sexButtonElements = null;
  _ownSexButtonElements = null;
  _companionSexButtonElements = null;
  _isInCommunicationTopic = null;

  _isFirstUpdate = true;

  _ownSexState = null;
  _companionSexState = null;

  _observerConfig = {
    childList: true,
    subtree: true,
  };
  _observerNode = document.body;
  _sexFieldUnlockObserver = null;
  _observerCallback = null;
  _observerPromiseResolve = null;

  _sexFieldUnlocked = null;

  static create = async () => {
    const sexFieldUnlocker = new SexFieldUnlocker();
    await sexFieldUnlocker._init();

    return sexFieldUnlocker;
  };

  _init = async () => {
    await this._initState();

    this._bindEvents();
  };

  _initState = async () => {
    this._sexFieldUnlocked = await settingsManager.getSettingValue(SETTINGS_IDS.sexFieldUnlocked);

    this._sexFieldUnlockObserver = this._getSexFieldUnlockObserver();
    await this._initSexFieldUnlockObserver();
  };

  _getSexFieldUnlockObserver = () => {
    this._observerCallback = () => {
      let search = document.querySelector(selectors.searchButtonID);
      if (search) this._searchButtonElement = search;

      let field = document.querySelector(selectors.sexFieldClass);
      if (field) {
        this._setupSexFieldElements(field);

        if (this._isFirstUpdate) {
          this._saveButtonStates();
          this._isFirstUpdate = false;
        }

        if (!this._isInCommunicationTopic) {
          enableButtons(this._sexButtonElements);
        }

        this._adjustCommunicationButtons();

        this._updateUI();
      }

      if (this._searchButtonElement && this._sexFieldElement) {
        this._bindEvents();

        this._observerPromiseResolve?.();
        this._observerPromiseResolve = null;
      }
    };

    return new MutationObserver(this._observerCallback);
  };

  _setupSexFieldElements = (main) => {
    const MIN_COMMUNICATION_TOPIC_BUTTONS = 4;

    this._sexFieldElement = main ?? document.querySelector(selectors.sexFieldClass);
    this._sexButtonElements = Array.from(
      this._sexFieldElement.querySelectorAll(selectors.buttonsClass),
    );
    this._isInCommunicationTopic = this._sexButtonElements.length > MIN_COMMUNICATION_TOPIC_BUTTONS;
    this._ownSexButtonElements = this._sexButtonElements.slice(
      0,
      this._sexButtonElements.length / 2,
    );
    this._companionSexButtonElements = this._sexButtonElements.slice(
      (-1 * this._sexButtonElements.length) / 2,
    );
  };

  _initSexFieldUnlockObserver = async () => {
    return new Promise((resolve) => {
      if (!this._sexFieldUnlocked) {
        resolve();
        return;
      }

      if (this._observerNode) {
        this._observerPromiseResolve = resolve;
        this._sexFieldUnlockObserver.observe(this._observerNode, this._observerConfig);
      } else {
        this._showAlert(
          'Произошла ошибка инициализации расширения «NektoMe Freedom».\
          Попробуйте перезагрузить страницу',
        );

        resolve();
      }
    });
  };

  _saveButtonStates = () => {
    const startIndex = this._isInCommunicationTopic ? 1 : 0;

    this._ownSexState = this._ownSexButtonElements
      .slice(startIndex)
      .map((button) => button.classList.contains(stateClasses.checked));

    this._companionSexState = this._companionSexButtonElements
      .slice(startIndex)
      .map((button) => button.classList.contains(stateClasses.checked));
  };

  _setButtonStates = (button) => {
    const isOwn = this._ownSexButtonElements.includes(button);
    const buttons = isOwn ? this._ownSexButtonElements : this._companionSexButtonElements;
    const states = isOwn ? this._ownSexState : this._companionSexState;

    const originalIndex = buttons.indexOf(button);
    const indexOffset = this._isInCommunicationTopic ? 1 : 0;
    const adjustedIndex = originalIndex - indexOffset;

    const resetStates = (target = states) => target.fill(false);

    if (!this._isInCommunicationTopic) {
      resetStates();
      states[adjustedIndex] = true;
      return;
    }

    if (isOwn) {
      this._ownSexState[adjustedIndex] = true;

      switch (originalIndex) {
        case 0:
          this._ownSexState.fill(false);
          this._companionSexState.fill(false);
          this._companionSexButtonElements[0].classList.add(stateClasses.checked);
          break;
        case 1:
        case 2:
          this._ownSexState.fill(false);
          this._ownSexState[adjustedIndex] = true;
          break;
      }
    } else {
      this._companionSexState[adjustedIndex] = true;

      switch (originalIndex) {
        case 0:
          this._companionSexState.fill(false);
          this._companionSexButtonElements[0].classList.add(stateClasses.checked);
          break;
        case 1:
        case 2:
          this._companionSexState.fill(false);
          this._companionSexState[adjustedIndex] = true;
          break;
      }
    }
  };

  _resetCompanionButtons = () => {
    if (this._isInCommunicationTopic) return;

    disableButtons(this._companionSexButtonElements);

    for (const button of this._companionSexButtonElements) {
      button.classList.remove(stateClasses.checked);
    }

    if (this._ownSexState[0]) {
      this._companionSexButtonElements[1].classList.add(stateClasses.checked);
      this._companionSexButtonElements[0].classList.remove(stateClasses.checked);
    }

    if (this._ownSexState[1]) {
      this._companionSexButtonElements[0].classList.add(stateClasses.checked);
      this._companionSexButtonElements[1].classList.remove(stateClasses.checked);
    }
  };

  _adjustCommunicationButtons = () => {
    const isCommunicationUpdate = this._isInCommunicationTopic && !this._isFirstUpdate;
    const ownButtonSomeoneChecked = this._ownSexButtonElements[0].classList.contains(
      stateClasses.checked,
    );
    const hasCompanionSelection = this._companionSexState[0] || this._companionSexState[1];

    if (isCommunicationUpdate) {
      if (!ownButtonSomeoneChecked && hasCompanionSelection) {
        this._companionSexButtonElements[0].classList.remove(stateClasses.checked);
      }

      if (ownButtonSomeoneChecked && hasCompanionSelection) {
        this._companionSexState.fill(false);
        disableButtons(this._companionSexButtonElements);
      }

      if (ownButtonSomeoneChecked && !hasCompanionSelection) {
        disableButtons(this._companionSexButtonElements);
      }
    }
  };

  _updateUI = () => {
    const startIndex = this._isInCommunicationTopic ? 1 : 0;

    this._ownSexButtonElements
      .slice(startIndex)
      .forEach((button, index) =>
        button.classList.toggle(stateClasses.checked, this._ownSexState[index]),
      );

    this._companionSexButtonElements
      .slice(startIndex)
      .forEach((button, index) =>
        button.classList.toggle(stateClasses.checked, this._companionSexState[index]),
      );
  };

  _syncRequestStateBeforeSubmit = () => {
    for (let button of this._companionSexButtonElements) {
      if (button.classList.contains(stateClasses.checked)) {
        button.dispatchEvent(new Event('click'));
      }
    }
  };

  _showAlert = (message) => {
    const alertHtml = getAlertHtml(message);

    document.body.insertAdjacentHTML('afterend', alertHtml);
    document
      .querySelector('#custom-alert .swal2-confirm')
      .addEventListener('click', () => document.getElementById('custom-alert').remove());
  };

  _onSexFieldClick = (event) => {
    if (!event.target.classList.contains(selectors.buttonBaseClass)) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (!this._isInCommunicationTopic) {
      enableButtons(this._sexButtonElements);
    }

    this._setButtonStates(event.target);
    this._updateUI();
    this._saveButtonStates();
  };

  _onSearchButtonClick = (event) => {
    const hasNoCompanionSelection = !this._companionSexState[0] && !this._companionSexState[1];

    if (!this._isInCommunicationTopic && hasNoCompanionSelection) {
      event.preventDefault();
      event.stopImmediatePropagation();

      const hasOwnSelection = this._ownSexState[0] || this._ownSexState[1];
      const alertMessage = hasOwnSelection
        ? 'Укажите пол собеседника.'
        : 'Укажите ваш пол и пол вашего собеседника.';
      this._showAlert(alertMessage);

      return;
    }

    this._syncRequestStateBeforeSubmit();
  };

  _onChromeStorageChange = (event) => {
    const sexFieldChange = event[SETTINGS_IDS.sexFieldUnlocked];

    if (!sexFieldChange) return;

    this._sexFieldUnlocked = sexFieldChange.newValue;

    if (this._sexFieldUnlocked) {
      this._searchButtonElement = document.querySelector(selectors.searchButtonID);

      this._setupSexFieldElements();

      if (!this._isInCommunicationTopic) {
        enableButtons(this._sexButtonElements);
      }

      this._saveButtonStates();
      this._updateUI();

      this._sexFieldUnlockObserver.observe(this._observerNode, this._observerConfig);
      this._searchButtonElement.addEventListener('click', this._onSearchButtonClick, true);
      this._sexFieldElement.addEventListener('click', this._onSexFieldClick);

      this._bindEvents();
    } else {
      if (!this._isInCommunicationTopic) {
        this._saveButtonStates();
      }

      this._sexFieldUnlockObserver.disconnect();
      this._searchButtonElement.removeEventListener('click', this._onSearchButtonClick);
      this._sexFieldElement.removeEventListener('click', this._onSexFieldClick);
      this._resetCompanionButtons();
    }
  };

  _bindEvents = () => {
    chrome.storage.onChanged.addListener(this._onChromeStorageChange);

    if (!this._sexFieldUnlocked) return;

    this._searchButtonElement.addEventListener('click', this._onSearchButtonClick, true);

    this._sexFieldElement.addEventListener('click', this._onSexFieldClick);
  };
}

export { SexFieldUnlocker };
