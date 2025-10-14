import Animation from '../utils/Animation.js';
import TimingFunction from '../utils/TimingFunction.js';
import afterVisualUpdate from '../utils/afterVisualUpdate.js';
import getTranslate from '../utils/getTranslate.js';
import getCurrentDuration from '../utils/getCurrentDuration.js';
import SettingsManager from '../SettingsManager.js';
import setupVerticalShadow from '../utils/setupVerticalShadow.js';
import psKeydownHandler from '../utils/psKeydownHandler.js';
import fixPsScroll from '../utils/fixPsScroll.js';

const rootSelector = '[data-js-tabs]';

class Tabs {
  selectors = {
    root: rootSelector,
    navigation: '[data-js-tabs-navigation]',
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
    status: '[data-js-tabs-status]',
  };

  stateClasses = {
    isActive: 'is-active',
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  }

  styleClasses = {
    shadow: 'shadow'
  }

  constructor(rootElement, storageID) {
    this.rootElement = rootElement;
    this.navigationElement = this.rootElement.querySelector(
      this.selectors.navigation);
    this.buttonElements = this.rootElement.querySelectorAll(
      this.selectors.button);
    this.contentElements = this.rootElement.querySelectorAll(
      this.selectors.content);
    this.statusElement = this.rootElement.querySelector(
      this.selectors.status);

    this.settingsManager = new SettingsManager();
    this.storageID = storageID;

    this.limitTabsIndex = this.buttonElements.length - 1;

    this.timingFunction = new TimingFunction();
    this.statusElementAnimationSettings = {
      timing: this.timingFunction.linear,
      duration: getCurrentDuration('--transition-duration'),
      draw: progress => this.animateStatus(progress),
    };
    this.statusElementAnimation = new Animation(
        this.statusElementAnimationSettings);

    this.perfectScrollbarSettings = {
      minScrollbarLength: 20
    };
    
    this.shadowSettings = {
      container: null,
      heightShadowPercentage: 50,
      shadowBottom: 0,
      shadowClass: this.selectors.shadow,
    };

    this.state = null;
  }

  static async create(rootElement, storageID) {
    const tab = new Tabs(rootElement, storageID);
    await tab.init(); 

    return tab;
  }

  async init() {
    await this.initState();
    await this.initUI();

    this.bindEvents();
  }

  async initState() {    
    let currentState = await this.settingsManager.getSessionTabState(
      this.storageID);
    this.state = this.getProxyState(currentState);
  }

  async initUI() {
    const oldDuration = this.statusElementAnimation.duration;
    this.statusElementAnimation.duration = 0;

    await this.updateAndSaveUI();
    this.fixFullVwLine();

    afterVisualUpdate(() =>
      this.statusElementAnimation.duration = oldDuration);
  }

  getProxyState(initialState) {
    initialState = initialState ?? {
      activeTabElement: [...this.buttonElements].find(buttonElement => 
        buttonElement.classList.contains(this.stateClasses.isActive)),

      activeTabIndex: [...this.buttonElements].findIndex(buttonElement => 
        buttonElement.classList.contains(this.stateClasses.isActive)),
      
      activeTabWidth: null,

      statusElementInitialWidth: null,
      statusElementInitialLeft: Math.floor(
        this.statusElement.getBoundingClientRect().left),
    };

    return new Proxy(initialState, {
      set: (target, prop, value) => {
        target[prop] = value;
        
        if (prop === 'activeTabIndex') {
          this.updateAndSaveUI();
        }
  
        return true;
      }
    });
  }

  async updateAndSaveUI() {
    await this.updateTabs();
    this.updateStatus();

    await this.settingsManager.setSessionTabState(this.state, this.storageID);
  }

  async updateTabs() {
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = this.state.activeTabIndex === index;

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, 
        isActive.toString());
      buttonElement.setAttribute(this.stateAttributes.tabIndex, 
        isActive ? '0' : '-1');
      
      if (buttonElement.classList.contains(this.stateClasses.isActive)) {
        this.state.activeTabElement = buttonElement;
        this.state.activeTabWidth = Math.round(buttonElement.clientWidth);
      }
    });

    this.contentElements.forEach((contentElement, index) => {
      const isActive = this.state.activeTabIndex === index;

      contentElement.classList.toggle(this.stateClasses.isActive, isActive);

      if (!isActive || index === 0 ) return;

      this.initScrollSettings(contentElement, true);
    });
  }

  initScrollSettings(element, afterUiUpdate) {
    const setupEffects = () => {
      if (!element.perfectScrollbar) {
        element.perfectScrollbar = new PerfectScrollbar(element, 
          this.perfectScrollbarSettings);

        this.shadowSettings.container = element;
        setupVerticalShadow(this.shadowSettings);

        element.addEventListener('keydown', psKeydownHandler);
        element.addEventListener('ps-y-reach-end', fixPsScroll);
        element.addEventListener('ps-scroll-up', fixPsScroll);
        element.addEventListener('wheel', fixPsScroll);

        removeTabIndex(element);
      } else element.perfectScrollbar.update();
    }
    
    const removeTabIndex = (element) => {
      let thumb = element.querySelector('.ps__thumb-y');
      thumb.removeAttribute('tabindex');
    }
    
    if (afterUiUpdate) {
      requestAnimationFrame(() => setupEffects());
    } else setupEffects();
  }

  fixFullVwLine() {
    //Когда borderWidth = 1px, в хром может появиться баг, при котором 
    //borderWidth окажется равным 0.8px. Также в целом могут примениться 
    //неожиданные округления. Данный метод избавляет нас от них и позволяет
    //корректно смещать иконку, ставя её ровно по центру родителя.
    //https://ru.stackoverflow.com/questions/637983/%D0%91%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80-%D1%83%D0%BC%D0%B5%D0%BD%D1%8C%D1%88%D0%B0%D0%B5%D1%82-%D1%82%D0%BE%D0%BB%D1%89%D0%B8%D0%BD%D1%83-border?ysclid=m8nuc6me95714489926

    let elementsWithLine = document.querySelectorAll('.full-vw-line');

    elementsWithLine.forEach((element) => {
      let isTop = element.classList.contains('full-vw-line--completely-top') ?
        true : false;

      let borderWidth = isTop ? getComputedStyle(element).borderTopWidth 
      : getComputedStyle(element).borderBottomWidth;

      element.style.setProperty('--border-width', borderWidth);
    });
  }

  updateStatus() {
    this.state.statusElementInitialWidth = Math.round(
      this.statusElement.getBoundingClientRect().width);
    this.state.statusElementInitialLeft = Math.floor(
      this.statusElement.getBoundingClientRect().left);

    if (this.statusElementAnimation.animationId) {
      this.statusElementAnimation.stopAnimation();

      this.statusElement.style.width =
        this.state.statusElementInitialWidth + 'px';
      this.statusElement.style.transform = `translateX(${getTranslate(
        this.statusElement,
        'x'
      )}px)`;

      this.statusElementAnimation.animate();
    } else {
      this.statusElementAnimation.animate();
    }
  }

  animateStatus(progress) {
    const activeTabElementWidth = Math.round(
      this.state.activeTabElement.offsetWidth);
    const activeTabElementLeft = Math.floor(
      this.state.activeTabElement.getBoundingClientRect().left);
    const activeTabElementOffsetLeft = Math.round(parseInt(getComputedStyle(
      this.state.activeTabElement).paddingLeft));

    const statusElementWidth = this.state.statusElementInitialWidth;
    const statusElementLeft = this.state.statusElementInitialLeft;

    const scaleDifference = statusElementWidth / activeTabElementWidth;
    const statusElementFraction = (statusElementWidth - activeTabElementWidth) / 
      statusElementWidth;
    const leftDifference = statusElementLeft - activeTabElementLeft;

    let transformTranslateX = null;
    let transformScaleX = null;

    if (scaleDifference < 1) {
      transformScaleX = 1 + statusElementFraction * -1 * progress;
    } else if (scaleDifference > 1) {
      transformScaleX = 1 - statusElementFraction * progress;
    } else transformScaleX = 1;

    if (leftDifference < 0) {
      transformTranslateX = statusElementLeft - activeTabElementOffsetLeft + 
        leftDifference * -1 * progress;
    } else if (leftDifference > 0) {
      transformTranslateX = statusElementLeft - activeTabElementOffsetLeft - 
        leftDifference * progress;    
    } else transformTranslateX = 0;

    transformTranslateX = Math.floor(transformTranslateX);

    this.statusElement.style.left = 0;
    this.statusElement.style.transform = 
      `translateX(${transformTranslateX}px) scaleX(${transformScaleX})`;

    if (progress >= 1 || leftDifference === 0) {
      this.statusElement.style.transform = 'none';
      this.statusElement.style.width = activeTabElementWidth + 'px';
      this.statusElement.style.left = activeTabElementLeft -
        activeTabElementOffsetLeft + 'px';  
    }
  }

  activateTab(newTabIndex) {
    requestAnimationFrame(() => {
      this.state.activeTabIndex = newTabIndex;
      this.buttonElements[newTabIndex].focus();

      this.contentElements.forEach((contentElement, index) => {
        const isActive = this.state.activeTabIndex === index;
  
        if (!isActive || index === 0) return;

        this.initScrollSettings(contentElement);
      });
    });
  }

  previousTab()  {
    const newTabIndex = this.state.activeTabIndex === 0
      ? this.limitTabsIndex
      : this.state.activeTabIndex - 1;

    this.activateTab(newTabIndex);
  }

  nextTab() {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
      ? 0
      : this.state.activeTabIndex + 1;

    this.activateTab(newTabIndex);
  }

  firstTab() {
    const isCurrentTabFirst = this.state.activeTabIndex === 0;
    
    if (isCurrentTabFirst) return;
   
    this.activateTab(0);
  }

  lastTab() {
    const isCurrentTabLast = this.state.activeTabIndex === this.limitTabsIndex;
    
    if (isCurrentTabLast) return;

    this.activateTab(this.limitTabsIndex);
  }

  onKeyDown(event) {
    const {code, metaKey} = event;

    const action = {
      ArrowLeft: () => this.previousTab(),
      ArrowRight: () => this.nextTab(),
      Home: () => this.firstTab(),
      End: () => this.lastTab(),
    }[code];

    const isMacHomeKey = metaKey && code === 'ArrowLeft';
    if (isMacHomeKey) {
      this.firstTab();
      return;
    }

    const isMacEndKey = metaKey && code === 'ArrowRight';
    if (isMacEndKey) {
      this.lastTab();
      return;
    }

    action?.();
  }

  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex; 
  }

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onButtonClick(index));
    });

    this.navigationElement.addEventListener('keydown', event => 
      this.onKeyDown(event));
  }
}

class TabsCollection {
  constructor() {
    this.tabs = null;
  }

  
  static async create() {
    const tabs = new TabsCollection();
    await tabs.init(); 

    return tabs;
  }

  async init() {
    const tabElements = document.querySelectorAll(rootSelector);

    this.tabs = await Promise.all(Array.from(tabElements).map(
      async (element, index) => { 
        return await Tabs.create(element, index); 
    }));
  }
}

export default TabsCollection;