import SettingsManager from '../SettingsManager.js';
import afterVisualUpdate from '../utils/afterVisualUpdate.js'

class Settings {
  selectors = {
    root: '[data-js-settings]',

    themeSwitcher: '[data-js-settings-themeSwitcher]',
    themeSwitcherInput: '[data-js-settings-themeSwitcher-input]',
    darkStyle: 'link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]',
    lightStyle: 
      'link[rel=stylesheet][media*=prefers-color-scheme][media*=light]',
    
    themeSwitchableElement: '[data-js-theme-switchable]',

    unlockSexFieldCheckbox: '[data-js-settings-checkbox-unlockSexField]',
    unlockCopyCheckbox: '[data-js-settings-checkbox-unlockCopy]',
  }

  stateClasses = {
    isLight: 'is-light',
    isDark: 'is-dark',
    isAnimationDisabled: 'is-disabled-animation',
  }

  constructor() {
    this.settingsManager = new SettingsManager();

    this.rootElement = document.querySelector(this.selectors.root);

    this.themeSwitcherElement = this.rootElement.querySelector(this.selectors.
      themeSwitcher);
    this.themeSwitcherInputElements = this.themeSwitcherElement.
      querySelectorAll(this.selectors.themeSwitcherInput);
    this.themeSwitchableElements = document.querySelectorAll(this.selectors.
      themeSwitchableElement);
    this.darkStyles = document.querySelectorAll(this.selectors.darkStyle);
    this.lightStyles = document.querySelectorAll(this.selectors.lightStyle);

    this.unlockSexFieldElement = document.querySelector(
      this.selectors.unlockSexFieldCheckbox);
    this.unlockCopyElement = document.querySelector(
      this.selectors.unlockCopyCheckbox);

    this.state = null;

    this.boundOnThemeSwitcherInputClick = 
      this.onThemeSwitcherInputClick.bind(this);
    this.boundOnSexFieldChange = this.onSexFieldChange.bind(this);
    this.boundOnCopyChange = this.onCopyChange.bind(this);
  }

  getProxyState(initialState) {
    return new Proxy(initialState, {
      set: (target, prop, value) => {
        target[prop] = value;

        this.updateUI();
  
        return true;
      }
    });
  }

  static async create() {
    const settings = new Settings();
    await settings.init();
    
    return settings;
  }

  async init() {
    await this.initState();
    await this.initUI();
        
    this.bindEvents();
  }

  async initUI() {
    document.documentElement.classList.add(
      this.stateClasses.isAnimationDisabled);

    await this.initUnlockElements();
    await this.initThemeSwitcherElement(); 
    this.updateUI();

    await afterVisualUpdate(() => {
      document.documentElement.classList.remove(
        this.stateClasses.isAnimationDisabled);

        this.setTabsHeight();
        
        requestAnimationFrame(() => {
          this.rootElement.style.visibility = "visible";
          this.rootElement.style.overflow = "visible";    
        });
    });
  }

  async initState() {
    let safeTheme = await this.settingsManager.getLocalTheme();

    if (!safeTheme) safeTheme = [...this.themeSwitcherInputElements].find(
      input => input.checked).value;

    const currentState = {
      currentTheme: safeTheme,
    };

    this.state = this.getProxyState(currentState); 
  }

  async initThemeSwitcherElement() {    
    this.fixThemeSwitcherIconPosition();

    const currentTheme = this.state.currentTheme;

    if (currentTheme === 'auto') return;

    this.themeSwitcherInputElements.forEach(inputElement => {
      inputElement.checked = (inputElement.value === currentTheme);
    });
  }

  fixThemeSwitcherIconPosition() {
    //Когда borderWidth = 1px, в хром может появиться баг, при котором 
    //borderWidth окажется равным 0.8px. Также в целом могут примениться 
    //неожиданные округления. Данный метод избавляет нас от них и позволяет
    //корректно смещать иконку, ставя её ровно по центру родителя.
    //https://ru.stackoverflow.com/questions/637983/%D0%91%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80-%D1%83%D0%BC%D0%B5%D0%BD%D1%8C%D1%88%D0%B0%D0%B5%D1%82-%D1%82%D0%BE%D0%BB%D1%89%D0%B8%D0%BD%D1%83-border?ysclid=m8nuc6me95714489926

    let inputBorderSize = parseFloat(getComputedStyle(
      this.themeSwitcherInputElements[0]).borderTopWidth);
    
    this.themeSwitcherInputElements.forEach((inputElement) => {
      inputElement.style = `--themeSwitcherRadioIconOffset: 
        ${(inputBorderSize) * -1}px`;  
    });
  }

  async initUnlockElements() {
    let [copyValue, sexValue] = await Promise.all([
      this.settingsManager.getLocalCopyUnlocked(),
      this.settingsManager.getLocalSexFieldUnlocked()
    ]);

    if (copyValue === undefined) {
      copyValue = this.settingsManager.getDefaultSettings().copyUnlocked; 
      await this.settingsManager.setLocalCopyUnlocked(copyValue);
    }

    if (sexValue === undefined) {
      sexValue = this.settingsManager.getDefaultSettings().sexFieldUnlocked; 
      await this.settingsManager.setLocalSexFieldUnlocked(sexValue);
    }

    this.unlockCopyElement.checked = copyValue;
    this.unlockSexFieldElement.checked = sexValue;
  }

  setTabsHeight() {
    const currentHeight = this.rootElement.clientHeight;

    document.documentElement.style = `--popupTabsHeight: ${currentHeight}px`;  
  }

  updateUI() {
    let lightMedia = null;
    let darkMedia = null;

    switch(this.state.currentTheme) {
      case 'auto': 
        lightMedia = '(prefers-color-scheme: light)';
        darkMedia = '(prefers-color-scheme: dark)';

        this.themeSwitchableElements.forEach(element => {
          element.classList.remove(this.stateClasses.isLight);
          element.classList.remove(this.stateClasses.isDark);
        });

        break;
      case 'light':
        lightMedia = 'all';
        darkMedia = 'not all';
        
        this.themeSwitchableElements.forEach(element => {
          element.classList.add(this.stateClasses.isLight);
          element.classList.remove(this.stateClasses.isDark);
        });
        
        break;
      case 'dark':
        lightMedia = 'not all';
        darkMedia = 'all';

        this.themeSwitchableElements.forEach(element => {
          element.classList.add(this.stateClasses.isDark);
          element.classList.remove(this.stateClasses.isLight);
        });

        break;
      default: 
        return;
    }

    this.darkStyles.forEach(link => link.media = darkMedia);
    this.lightStyles.forEach(link => link.media = lightMedia);
  }

  onThemeSwitcherInputClick(event) {
    const selectedTheme = event.target.value;

    this.settingsManager.setLocalTheme(selectedTheme);
    this.state.currentTheme = selectedTheme;
  }

  onSexFieldChange(event) {
    this.settingsManager.setLocalSexFieldUnlocked(event.target.checked);
  }

  onCopyChange(event) {
    this.settingsManager.setLocalCopyUnlocked(event.target.checked);
  }

  bindEvents() {
    this.themeSwitcherInputElements.forEach((input) => {
      input.addEventListener('change', this.boundOnThemeSwitcherInputClick);
    });

    this.unlockSexFieldElement.addEventListener('change', event =>
      this.boundOnSexFieldChange(event));

    this.unlockCopyElement.addEventListener('change', event =>
      this.boundOnCopyChange(event));
  }
}

export default Settings;