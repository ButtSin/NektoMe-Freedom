<script setup>
import { provide, ref, watch } from 'vue';

import IconLock from '@/icons/IconLock.vue';

import { isThemeChangingProvide } from '@/js/constants.js';
import settingsManager from '@/js/settingsManager';
import { useInitialTransition } from '@/html/shared/composables/useInitialTransition';
import { extensionVersion, THEME_TRANSITION_DURATION } from '@/js/constants';

import MainTabs from '@/html/popup/components/MainTabs.vue';

const isThemeChanging = ref(false);
const { isFirstUpdate, enableAnimations } = useInitialTransition({
  targetElement: document.documentElement,
  onDomReady: () => (isThemeChanging.value = false),
});
let timerThemeChanging = null;

provide(isThemeChangingProvide, isThemeChanging);

settingsManager.loadAllLocalSettings();
settingsManager.initSessionTabsState();

/*
TODO: Нужно ли добавить скроллбар при размере окна, вызывающем его появление? Такое возможно,
как минимум если REM'ы в стилях будут больше, чем сейчас, например, при значении "очень крупный" в
chrome.
 */

const applyTheme = async (theme) => {
  if (timerThemeChanging) clearTimeout(timerThemeChanging);

  isThemeChanging.value = true;

  const htmlElement = document.documentElement;

  htmlElement.classList.remove('is-light', 'is-dark');

  switch (theme) {
    case 'light': {
      htmlElement.classList.add('is-light');

      break;
    }
    case 'dark': {
      htmlElement.classList.add('is-dark');

      break;
    }
    case 'system': {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.classList.add(systemDark ? 'is-dark' : 'is-light');

      break;
    }
  }

  if (isFirstUpdate.value) {
    enableAnimations();
  } else {
    timerThemeChanging = setTimeout(() => {
      isThemeChanging.value = false;
    }, THEME_TRANSITION_DURATION);
  }
};

watch(() => settingsManager.getTheme().value, applyTheme);
</script>

<template>
  <header class="popup__header header">
    <h1 class="header__title">
      <span class="header__title-text">NektoMe Freedom — говорите вне лимитов</span>
      &nbsp;
      <span class="header__title-icon" aria-hidden="true">
        <IconLock />
      </span>
    </h1>
    <p class="header__version">v.&nbsp;{{ extensionVersion }}</p>
  </header>
  <main class="popup__main main">
    <MainTabs />
  </main>
  <footer class="popup__footer footer">
    <p>
      С уважением и признательностью посвящается моей хорошей подруге Мали. Спасибо тебе за всё.
    </p>
  </footer>
</template>

<style scoped lang="scss">
.popup__header {
  margin-bottom: var(--spacing-xs);
}

.popup__footer {
  padding-top: var(--spacing-xs);
  margin-top: var(--spacing-xs);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: end;

  &__title {
    position: relative;

    display: flex;
    align-items: center;
    width: fit-content;

    &-text {
      hyphens: auto;

      transition-duration: var(--transition-duration);
    }

    &-icon {
      display: flex;
    }
  }

  &__version {
    margin-bottom: rem(2);

    color: colorToOpacity(var(--opacity));
    font-size: rem(12);
  }
}

.footer {
  font-style: italic;
  text-align: right;
  text-wrap: balance;

  transition-property: color;
  transition-duration: var(--transition-duration);

  @include separator-line($side: top);
}
</style>
